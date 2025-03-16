import { Module } from '@nestjs/common';
import { PainelService } from './painel.service';
import { PainelController } from './painel.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PainelController],
  providers: [PainelService, PrismaService],
  exports: [PainelService]
})
export class PainelModule {}
