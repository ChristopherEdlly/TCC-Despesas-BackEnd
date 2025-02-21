import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContaPagarService } from './conta-pagar.service';
import { CreateContaPagarDto } from './dto/create-conta-pagar.dto';
import { UpdateContaPagarDto } from './dto/update-conta-pagar.dto';

@Controller('conta-pagar')
export class ContaPagarController {
  constructor(private readonly contaPagarService: ContaPagarService) {}

  @Post()
  create(@Body() createContaPagarDto: CreateContaPagarDto) {
    return this.contaPagarService.create(createContaPagarDto);
  }

  @Get()
  findAll() {
    return this.contaPagarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contaPagarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContaPagarDto: UpdateContaPagarDto) {
    return this.contaPagarService.update(+id, updateContaPagarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contaPagarService.remove(+id);
  }
}
