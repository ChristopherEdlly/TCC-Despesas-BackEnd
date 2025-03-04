import { Decimal } from '@prisma/client/runtime/library';
import {
    IsInt,
    IsDateString,
    IsNotEmpty,
    Min,
    IsString,
} from 'class-validator';

export class CreateContaAPagarDto {
    valor: Decimal;

    @IsDateString()
    @IsNotEmpty()
    dataVencimento: string;

    @IsString()
    @IsNotEmpty()
    statusPagamento: string;

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    quantidadeParcelas: number;

    @IsInt()
    @IsNotEmpty()
    despesaId: number;
}
