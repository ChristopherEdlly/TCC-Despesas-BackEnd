import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DespesaGrupoService {
    constructor(private prisma: PrismaService) {}
}
