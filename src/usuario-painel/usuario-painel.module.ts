import { Module } from '@nestjs/common';
import { UsuarioPainelService } from './usuario-painel.service';
import { UsuarioPainelController } from './usuario-painel.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PainelModule } from 'src/painel/painel.module';

@Module({
  imports: [PainelModule],
  controllers: [UsuarioPainelController],
  providers: [UsuarioPainelService, PrismaService],
  exports: [UsuarioPainelService],
})
export class UsuarioPainelModule {}
