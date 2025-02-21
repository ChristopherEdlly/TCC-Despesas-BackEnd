import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaReceitaController } from './categoria-receita.controller';
import { CategoriaReceitaService } from './categoria-receita.service';

describe('CategoriaReceitaController', () => {
    let controller: CategoriaReceitaController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CategoriaReceitaController],
            providers: [CategoriaReceitaService],
        }).compile();

        controller = module.get<CategoriaReceitaController>(
            CategoriaReceitaController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
