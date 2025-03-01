import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePainelDto {
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsString()
    descricao?: string;

    @IsInt()
    @IsNotEmpty()
    usuarioId: number;
}
