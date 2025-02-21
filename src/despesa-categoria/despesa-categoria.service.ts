import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DespesaCategoriaService {
    constructor(private prisma: PrismaService) {}
}
