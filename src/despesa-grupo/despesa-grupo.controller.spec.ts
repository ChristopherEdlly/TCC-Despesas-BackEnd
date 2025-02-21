import { Test, TestingModule } from '@nestjs/testing';
import { DespesaGrupoController } from './despesa-grupo.controller';
import { DespesaGrupoService } from './despesa-grupo.service';

describe('DespesaGrupoController', () => {
  let controller: DespesaGrupoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DespesaGrupoController],
      providers: [DespesaGrupoService],
    }).compile();

    controller = module.get<DespesaGrupoController>(DespesaGrupoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
