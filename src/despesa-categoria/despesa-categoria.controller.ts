import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { DespesaCategoriaService } from './despesa-categoria.service';
import { CreateDespesaCategoriaDto } from './dto/create-despesa-categoria.dto';
import { UpdateDespesaCategoriaDto } from './dto/update-despesa-categoria.dto';

@Controller('despesa-categoria')
export class DespesaCategoriaController {
    constructor(
        private readonly despesaCategoriaService: DespesaCategoriaService,
    ) {}
}
