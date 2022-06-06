import { Test, TestingModule } from '@nestjs/testing';
import { CommissionController } from './app.controller';
import { CommissionService } from './app.service';

describe('CommissionController', () => {
  let controller: CommissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommissionController],
      providers: [CommissionService],
    }).compile();

    controller = module.get<CommissionController>(CommissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
