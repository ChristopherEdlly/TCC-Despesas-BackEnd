import { IsNotEmpty } from 'class-validator';

export class CreatePainelDto {
    @IsNotEmpty()
    nome: string;
    descricao?: string;
    usuarioId: number;
}
