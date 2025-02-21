import { Injectable } from '@nestjs/common';
import { CreateCategoriaReceitaDto } from './dto/create-categoria-receita.dto';
import { UpdateCategoriaReceitaDto } from './dto/update-categoria-receita.dto';

@Injectable()
export class CategoriaReceitaService {
    create(createCategoriaReceitaDto: CreateCategoriaReceitaDto) {
        return 'This action adds a new categoriaReceita';
    }

    findAll() {
        return `This action returns all categoriaReceita`;
    }

    findOne(id: number) {
        return `This action returns a #${id} categoriaReceita`;
    }

    update(id: number, updateCategoriaReceitaDto: UpdateCategoriaReceitaDto) {
        return `This action updates a #${id} categoriaReceita`;
    }

    remove(id: number) {
        return `This action removes a #${id} categoriaReceita`;
    }
}
