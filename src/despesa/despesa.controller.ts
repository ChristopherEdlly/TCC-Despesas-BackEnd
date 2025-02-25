import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { DespesaService } from './despesa.service';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';

@Controller('despesa')
export class DespesaController {
    constructor(private readonly despesaService: DespesaService) {}

    @Post()
    create(@Body() createDespesaDto: CreateDespesaDto) {
        return this.despesaService.create(createDespesaDto);
    }

    @Get('painel/:painelId')
    buscarPorUsuarioId(@Param('painelId') painelId: string) {
        return this.despesaService.buscarPorUsuarioId(+painelId);
    }
}
