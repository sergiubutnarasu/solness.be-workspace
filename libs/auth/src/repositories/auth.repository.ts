import { BaseRepository, UserContext } from '@solness/core';
import { CustomRepository } from '@solness/custom-repository';
import { SelectQueryBuilder } from 'typeorm';
import { RefreshToken } from './../objects';

@CustomRepository(RefreshToken)
export class AuthRepository extends BaseRepository<RefreshToken> {
  protected addAccessCondition(
    query: SelectQueryBuilder<RefreshToken>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _user: UserContext,
  ): SelectQueryBuilder<RefreshToken> {
    return query;
  }
}
