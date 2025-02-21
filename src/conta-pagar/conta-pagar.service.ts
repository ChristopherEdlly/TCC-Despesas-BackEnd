import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContaPagarService {
    constructor(private prisma: PrismaService) {}
}
