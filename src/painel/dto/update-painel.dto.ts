import { PartialType } from '@nestjs/mapped-types';
import { CreatePainelDto } from './create-painel.dto';

export class UpdatePainelDto extends PartialType(CreatePainelDto) {}
