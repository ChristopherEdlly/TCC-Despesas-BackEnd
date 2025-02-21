import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaReceitaDto } from './create-categoria-receita.dto';

export class UpdateCategoriaReceitaDto extends PartialType(CreateCategoriaReceitaDto) {}
