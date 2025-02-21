import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CategoriaReceitaService } from './categoria-receita.service';
import { CreateCategoriaReceitaDto } from './dto/create-categoria-receita.dto';
import { UpdateCategoriaReceitaDto } from './dto/update-categoria-receita.dto';

@Controller('categoria-receita')
export class CategoriaReceitaController {
    constructor(
        private readonly categoriaReceitaService: CategoriaReceitaService,
    ) {}

    @Post()
    create(@Body() createCategoriaReceitaDto: CreateCategoriaReceitaDto) {
        return this.categoriaReceitaService.create(createCategoriaReceitaDto);
    }

    @Get()
    findAll() {
        return this.categoriaReceitaService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoriaReceitaService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCategoriaReceitaDto: UpdateCategoriaReceitaDto,
    ) {
        return this.categoriaReceitaService.update(
            +id,
            updateCategoriaReceitaDto,
        );
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categoriaReceitaService.remove(+id);
    }
}
