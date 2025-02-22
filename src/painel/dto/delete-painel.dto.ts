import { IsInt } from 'class-validator';

export class DeletePainelDto {
    @IsInt()
    id: number;
}
