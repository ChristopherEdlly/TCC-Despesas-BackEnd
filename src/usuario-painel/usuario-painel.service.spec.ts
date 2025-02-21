import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioPainelService } from './usuario-painel.service';

describe('UsuarioPainelService', () => {
  let service: UsuarioPainelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioPainelService],
    }).compile();

    service = module.get<UsuarioPainelService>(UsuarioPainelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
