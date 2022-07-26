import { BaseRepository, UserContext } from '@solness/core';
import { CustomRepository } from '@solness/custom-repository';
import { SelectQueryBuilder } from 'typeorm';
import { Company } from '../objects';

@CustomRepository(Company)
export class CompanyRepository extends BaseRepository<Company> {
  protected addAccessCondition(
    query: SelectQueryBuilder<Company>,
    user: UserContext,
  ): SelectQueryBuilder<Company> {
    return query
      .innerJoin(
        'companyUser',
        'COMPANY_USER',
        'GENERIC.id = COMPANY_USER.companyId',
      )
      .andWhere('COMPANY_USER.verified = true')
      .andWhere('COMPANY_USER.userId = :userId', {
        userId: user.id,
      });
  }
}
