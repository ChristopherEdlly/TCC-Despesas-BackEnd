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
}
