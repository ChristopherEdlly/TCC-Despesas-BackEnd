import { Test, TestingModule } from '@nestjs/testing';
import { DespesaGrupoService } from './despesa-grupo.service';

describe('DespesaGrupoService', () => {
  let service: DespesaGrupoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DespesaGrupoService],
    }).compile();

    service = module.get<DespesaGrupoService>(DespesaGrupoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
