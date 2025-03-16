import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoriaReceitaDto {

    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsNotEmpty()
    @IsInt()
    painelId: number;
}
