import { Test, TestingModule } from '@nestjs/testing';
import { ContaPagarController } from './conta-pagar.controller';
import { ContaPagarService } from './conta-pagar.service';

describe('ContaPagarController', () => {
  let controller: ContaPagarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContaPagarController],
      providers: [ContaPagarService],
    }).compile();

    controller = module.get<ContaPagarController>(ContaPagarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
