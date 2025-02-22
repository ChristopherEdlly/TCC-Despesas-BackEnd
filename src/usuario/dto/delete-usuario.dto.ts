import { IsInt } from 'class-validator';

export class DeleteUsuarioDto {
    @IsInt()
    id: number;
}
