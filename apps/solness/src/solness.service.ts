import { Injectable } from '@nestjs/common';

@Injectable()
export class SolnessService {
  getHello(): string {
    return 'Hello World!';
  }
}
