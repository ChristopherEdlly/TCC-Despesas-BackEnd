import { PartialType } from '@nestjs/mapped-types';
import { CreateContaAPagarDto } from './create-conta-pagar.dto';

export class UpdateContaPagarDto extends PartialType(CreateContaAPagarDto) {}
