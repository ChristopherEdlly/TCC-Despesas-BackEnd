import { Module } from '@nestjs/common';
import { UsuarioPainelService } from './usuario-painel.service';
import { UsuarioPainelController } from './usuario-painel.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UsuarioPainelController],
  providers: [UsuarioPainelService, PrismaService],
  exports: [UsuarioPainelService] // Importante: exportar o serviço
})
export class UsuarioPainelModule {}
