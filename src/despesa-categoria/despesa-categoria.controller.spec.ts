import { Test, TestingModule } from '@nestjs/testing';
import { DespesaCategoriaController } from './despesa-categoria.controller';
import { DespesaCategoriaService } from './despesa-categoria.service';

describe('DespesaCategoriaController', () => {
  let controller: DespesaCategoriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DespesaCategoriaController],
      providers: [DespesaCategoriaService],
    }).compile();

    controller = module.get<DespesaCategoriaController>(DespesaCategoriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
