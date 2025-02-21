import { Test, TestingModule } from '@nestjs/testing';
import { DespesaCategoriaService } from './despesa-categoria.service';

describe('DespesaCategoriaService', () => {
  let service: DespesaCategoriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DespesaCategoriaService],
    }).compile();

    service = module.get<DespesaCategoriaService>(DespesaCategoriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
