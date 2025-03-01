import { Module } from "@nestjs/common";
import { ReceitaController } from "./receita.controller";
import { ReceitaService } from "./receita.service";
import { PainelService } from "src/painel/painel.service";
import { UsuarioPainelService } from "src/usuario-painel/usuario-painel.service";

@Module({
  controllers: [ReceitaController],
  providers: [ReceitaService, PainelService, UsuarioPainelService],
})
export class ReceitaModule {}
