import { Query, Resolver } from '@nestjs/graphql';
import { SolnessService } from './solness.service';

@Resolver()
export class SolnessResolver {
  constructor(private readonly service: SolnessService) {}

  @Query(() => String)
  hello(): string {
    return this.service.getHello();
  }
}
