import { PainelController } from './../../painel/painel.controller';
import { Decimal } from '@prisma/client/runtime/library';
import { Type } from 'class-transformer';
import {
    IsDate,
    IsDecimal,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';

export class CreateDespesaDto {
    @IsDecimal()
    @IsNotEmpty()
    valor: Decimal;

    @IsString()
    descricao: string;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    dataCompra: Date;

    @IsNumber()
    @IsNotEmpty()
    categoriaDespesaId: number;

    @IsNumber()
    @IsNotEmpty()
    painelId: number;
}
