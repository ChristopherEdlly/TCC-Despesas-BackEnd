import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUsuarioPainelDto {
    @IsString()
    @IsNotEmpty()
    permissao: string;

    @IsString()
    @IsNotEmpty()
    email: string;
    
    @IsInt()
    @IsNotEmpty()
    painelId: number;
}
