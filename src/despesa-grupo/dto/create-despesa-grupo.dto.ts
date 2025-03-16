import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateDespesaGrupoDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsInt()
    @IsNotEmpty()
    painelId: number;
}
