import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateDespesaCategoriaDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsInt()
    @IsNotEmpty()
    painelId: number; // Alterado de usuarioId para painelId

    @IsInt()
    @IsOptional()
    grupoDespesaId?: number;
}
