import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDespesaDto {
    @IsNumber()
    @IsNotEmpty()
    valor: number;

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
