import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { UserService, User } from '@solness/user';

@Injectable()
export class UsersLoader {
  constructor(private readonly userService: UserService) {}

  public get() {
    return new DataLoader<number, User>(async (keys: number[]) => {
      const users = await this.userService.getByIdsWithoutGuard(keys);

      const map = new Map(users.map((user) => [user.id, user]));
      return keys.map((key) => map.get(key));
    });
  }
}
