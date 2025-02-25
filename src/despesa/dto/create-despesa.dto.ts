import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDespesaDto {
    @IsNumber()
    @IsNotEmpty()
    valor: number;

    @IsString()
    descricao: string;

    @IsNumber()
    @IsNotEmpty()
    categoriaDespesaId: number;

    @IsNumber()
    @IsNotEmpty()
    painelId: number;
}
