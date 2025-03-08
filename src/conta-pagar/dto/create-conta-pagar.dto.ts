import {
    IsDateString,
    IsInt,
    IsNotEmpty,
    IsString,
    Min,
} from 'class-validator';

export class CreateContaAPagarDto {
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
