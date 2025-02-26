import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateDespesaCategoriaDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsInt()
    @IsNotEmpty()
    usuarioId: number;

    @IsInt()
    grupoDespesaId: number;
}
