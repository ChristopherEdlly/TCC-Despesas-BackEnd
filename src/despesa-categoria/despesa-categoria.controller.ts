import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DespesaCategoriaService } from './despesa-categoria.service';
import { CreateDespesaCategoriaDto } from './dto/create-despesa-categoria.dto';
import { UpdateDespesaCategoriaDto } from './dto/update-despesa-categoria.dto';

@Controller('despesa-categoria')
export class DespesaCategoriaController {
  constructor(private readonly despesaCategoriaService: DespesaCategoriaService) {}

  @Post()
  create(@Body() createDespesaCategoriaDto: CreateDespesaCategoriaDto) {
    return this.despesaCategoriaService.create(createDespesaCategoriaDto);
  }

  @Get()
  findAll() {
    return this.despesaCategoriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.despesaCategoriaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDespesaCategoriaDto: UpdateDespesaCategoriaDto) {
    return this.despesaCategoriaService.update(+id, updateDespesaCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.despesaCategoriaService.remove(+id);
  }
}
