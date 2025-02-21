import { PartialType } from '@nestjs/mapped-types';
import { CreateDespesaCategoriaDto } from './create-despesa-categoria.dto';

export class UpdateDespesaCategoriaDto extends PartialType(CreateDespesaCategoriaDto) {}
