import {
    IsInt,
    IsDateString,
    IsNotEmpty,
    Min,
    IsPositive,
    IsString,
} from 'class-validator';

export class CreateContaAPagarDto {
    @IsPositive()
    @IsNotEmpty()
    valor: number;

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
