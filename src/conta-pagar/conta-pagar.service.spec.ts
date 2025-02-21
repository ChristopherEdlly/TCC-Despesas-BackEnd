import { Test, TestingModule } from '@nestjs/testing';
import { ContaPagarService } from './conta-pagar.service';

describe('ContaPagarService', () => {
  let service: ContaPagarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContaPagarService],
    }).compile();

    service = module.get<ContaPagarService>(ContaPagarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
