import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaReceitaService } from './categoria-receita.service';

describe('CategoriaReceitaService', () => {
    let service: CategoriaReceitaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CategoriaReceitaService],
        }).compile();

        service = module.get<CategoriaReceitaService>(CategoriaReceitaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
