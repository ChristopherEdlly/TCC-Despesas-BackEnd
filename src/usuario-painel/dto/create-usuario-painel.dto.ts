import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUsuarioPainelDto {
    @IsString()
    @IsNotEmpty()
    permissao: string;

    @IsInt()
    @IsNotEmpty()
    usuarioId: number;

    @IsInt()
    @IsNotEmpty()
    painelId: number;
}
