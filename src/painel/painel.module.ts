import { Module } from '@nestjs/common';
import { PainelService } from './painel.service';
import { PainelController } from './painel.controller';
import { UsuarioPainelService } from 'src/usuario-painel/usuario-painel.service';

@Module({
  controllers: [PainelController],
  providers: [PainelService, UsuarioPainelService],
})
export class PainelModule {}
