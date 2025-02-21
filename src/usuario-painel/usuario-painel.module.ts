import { Module } from '@nestjs/common';
import { UsuarioPainelService } from './usuario-painel.service';
import { UsuarioPainelController } from './usuario-painel.controller';

@Module({
  controllers: [UsuarioPainelController],
  providers: [UsuarioPainelService],
})
export class UsuarioPainelModule {}
