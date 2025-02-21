import { PartialType } from '@nestjs/mapped-types';
import { CreateDespesaGrupoDto } from './create-despesa-grupo.dto';

export class UpdateDespesaGrupoDto extends PartialType(CreateDespesaGrupoDto) {}
