import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioPainelController } from './usuario-painel.controller';
import { UsuarioPainelService } from './usuario-painel.service';

describe('UsuarioPainelController', () => {
  let controller: UsuarioPainelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioPainelController],
      providers: [UsuarioPainelService],
    }).compile();

    controller = module.get<UsuarioPainelController>(UsuarioPainelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
