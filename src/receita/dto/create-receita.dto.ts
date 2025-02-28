import { TipoReceita } from '@prisma/client';
import { Type } from 'class-transformer';
import {
    IsDate,
    IsDecimal,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateReceitaDto {
    @IsNotEmpty()
    @IsDecimal()
    valor: number;

    @IsOptional()
    @IsString()
    descricao?: string;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    dataRecebimento: Date;

    @IsNotEmpty()
    @IsString()
    tipo: TipoReceita;

    @IsNotEmpty()
    @IsInt()
    categoriaReceitaId: number;

    @IsNotEmpty()
    @IsInt()
    painelId: number;
}
