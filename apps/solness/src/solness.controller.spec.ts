import { Test, TestingModule } from '@nestjs/testing';
import { SolnessController } from './solness.controller';
import { SolnessService } from './solness.service';

describe('SolnessController', () => {
  let solnessController: SolnessController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SolnessController],
      providers: [SolnessService],
    }).compile();

    solnessController = app.get<SolnessController>(SolnessController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(solnessController.getHello()).toBe('Hello World!');
    });
  });
});
