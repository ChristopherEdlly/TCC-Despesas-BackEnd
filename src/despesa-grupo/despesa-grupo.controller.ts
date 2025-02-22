import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { DespesaGrupoService } from './despesa-grupo.service';
import { CreateDespesaGrupoDto } from './dto/create-despesa-grupo.dto';
import { UpdateDespesaGrupoDto } from './dto/update-despesa-grupo.dto';

@Controller('despesa-grupo')
export class DespesaGrupoController {
    constructor(private readonly despesaGrupoService: DespesaGrupoService) {}
}
