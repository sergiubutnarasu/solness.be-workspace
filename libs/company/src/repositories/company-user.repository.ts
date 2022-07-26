import { BaseRepository, UserContext } from '@solness/core';
import { CustomRepository } from '@solness/custom-repository';
import { SelectQueryBuilder } from 'typeorm';
import { CompanyUser } from '../objects';

@CustomRepository(CompanyUser)
export class CompanyUserRepository extends BaseRepository<CompanyUser> {
  protected addAccessCondition(
    query: SelectQueryBuilder<CompanyUser>,
    user: UserContext,
  ): SelectQueryBuilder<CompanyUser> {
    return query.andWhere('GENERIC.companyId = :companyId', {
      companyId: user.data.companyId,
    });
  }

  public async getByUserId(userId: number, user: UserContext) {
    return await this.createQueryBuilder('COMPANY_USER')
      .select('COMPANY_USER.id')
      .where(
        'COMPANY_USER.userId = :userId AND COMPANY_USER.companyId = :companyId',
        { userId, companyId: +user.data.companyId },
      )
      .getOne();
  }

  public async excludeUser(userId: number, user: UserContext) {
    const entity = await this.getByUserId(userId, user);

    if (!entity) {
      return;
    }

    await this.delete(entity.id);
  }
}
