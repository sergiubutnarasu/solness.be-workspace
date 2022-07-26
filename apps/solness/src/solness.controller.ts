import { Controller, Get } from '@nestjs/common';
import { SolnessService } from './solness.service';

@Controller()
export class SolnessController {
  constructor(private readonly solnessService: SolnessService) {}

  @Get()
  getHello(): string {
    return this.solnessService.getHello();
  }
}
