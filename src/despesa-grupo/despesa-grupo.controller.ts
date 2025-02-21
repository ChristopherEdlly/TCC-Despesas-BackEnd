import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DespesaGrupoService } from './despesa-grupo.service';
import { CreateDespesaGrupoDto } from './dto/create-despesa-grupo.dto';
import { UpdateDespesaGrupoDto } from './dto/update-despesa-grupo.dto';

@Controller('despesa-grupo')
export class DespesaGrupoController {
  constructor(private readonly despesaGrupoService: DespesaGrupoService) {}

  @Post()
  create(@Body() createDespesaGrupoDto: CreateDespesaGrupoDto) {
    return this.despesaGrupoService.create(createDespesaGrupoDto);
  }

  @Get()
  findAll() {
    return this.despesaGrupoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.despesaGrupoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDespesaGrupoDto: UpdateDespesaGrupoDto) {
    return this.despesaGrupoService.update(+id, updateDespesaGrupoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.despesaGrupoService.remove(+id);
  }
}
