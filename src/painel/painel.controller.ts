import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PainelService } from './painel.service';
import { CreatePainelDto } from './dto/create-painel.dto';
import { UpdatePainelDto } from './dto/update-painel.dto';

@Controller('painel')
export class PainelController {
  constructor(private readonly painelService: PainelService) {}

  @Post()
  create(@Body() createPainelDto: CreatePainelDto) {
    return this.painelService.create(createPainelDto);
  }

  @Get()
  findAll() {
    return this.painelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.painelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePainelDto: UpdatePainelDto) {
    return this.painelService.update(+id, updatePainelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.painelService.remove(+id);
  }
}
