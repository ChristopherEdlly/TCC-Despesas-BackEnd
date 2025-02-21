import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioPainelDto } from './create-usuario-painel.dto';

export class UpdateUsuarioPainelDto extends PartialType(CreateUsuarioPainelDto) {}
