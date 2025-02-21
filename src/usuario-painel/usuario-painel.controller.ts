import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioPainelService } from './usuario-painel.service';
import { CreateUsuarioPainelDto } from './dto/create-usuario-painel.dto';
import { UpdateUsuarioPainelDto } from './dto/update-usuario-painel.dto';

@Controller('usuario-painel')
export class UsuarioPainelController {
  constructor(private readonly usuarioPainelService: UsuarioPainelService) {}

  @Post()
  create(@Body() createUsuarioPainelDto: CreateUsuarioPainelDto) {
    return this.usuarioPainelService.create(createUsuarioPainelDto);
  }

  @Get()
  findAll() {
    return this.usuarioPainelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioPainelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioPainelDto: UpdateUsuarioPainelDto) {
    return this.usuarioPainelService.update(+id, updateUsuarioPainelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioPainelService.remove(+id);
  }
}
