import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AppHelper, UserContext } from '@solness/core';
import { UserService } from '@solness/user';
import { Strategy } from 'passport-jwt';
import { AuthHelper } from '../helpers';
import { AuthKeys } from '../objects';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: AuthHelper.computeJwtToken(),
      ignoreExpiration: false,
      secretOrKey: AppHelper.getConfig(AuthKeys.AuthSecret),
    });
  }

  public async validate(payload: any): Promise<UserContext> {
    const userId = payload.sub;
    const user = await this.userService.getUserAuthPayload(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
