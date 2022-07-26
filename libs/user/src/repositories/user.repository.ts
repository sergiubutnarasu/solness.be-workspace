import { BaseRepository, CryptoHelper, Role, UserContext } from '@solness/core';
import { CustomRepository } from '@solness/custom-repository';
import { SelectQueryBuilder } from 'typeorm';
import { User } from '../objects';

@CustomRepository(User)
export class UserRepository extends BaseRepository<User> {
  protected addAccessCondition(
    query: SelectQueryBuilder<User>,
    user: UserContext,
  ): SelectQueryBuilder<User> {
    return query
      .innerJoin(
        'companyUser',
        'COMPANY_USER',
        'GENERIC.id = COMPANY_USER.userId',
      )
      .andWhere('COMPANY_USER.companyId = :companyId', {
        companyId: user.data.companyId,
      });
  }

  public async getUserAuthPayload(userId: number): Promise<UserContext> {
    const data = await this.createQueryBuilder('USER')
      .select('USER.id', 'id')
      .addSelect('USER.email', 'email')
      .addSelect('USER.role', 'role')
      .addSelect('USER.firstName', 'firstName')
      .addSelect('USER.lastName', 'lastName')
      .addSelect('COMPANY_USER.companyId', 'companyId')
      .addSelect('COMPANY_USER.roles', 'companyRoles')
      .leftJoin('companyUser', 'COMPANY_USER', 'COMPANY_USER.userId = USER.id')
      .where(' USER.id = :userId', { userId })
      .andWhere('USER.enabled = true')
      .andWhere('USER.verified = true')
      .getRawOne();

    if (!data) {
      return null;
    }

    const isAdmin = data.role === Role.Admin;

    let companyRoles = [];

    try {
      companyRoles = JSON.parse(data.companyRoles);
    } catch {}

    const context = {
      email: CryptoHelper.decryptValue(data.email),
      id: data.id,
      role: data.role,
      data: {
        isAdmin,
        companyId: data.companyId,
        companyRoles,
        firstName: CryptoHelper.decryptValue(data.firstName),
        lastName: CryptoHelper.decryptValue(data.lastName),
      },
    };

    return context;
  }

  public async getByEmail(email: string): Promise<User | undefined> {
    return await this.findOne({
      where: {
        email,
        enabled: true,
      },
    });
  }

  public async getByIdsWithoutGuard(
    ids: number[],
  ): Promise<User[] | undefined> {
    return await this.findByIds(ids);
  }
}
