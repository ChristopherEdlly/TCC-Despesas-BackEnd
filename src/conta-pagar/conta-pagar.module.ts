import { Module } from '@nestjs/common';
import { ContaPagarService } from './conta-pagar.service';
import { ContaPagarController } from './conta-pagar.controller';

@Module({
  controllers: [ContaPagarController],
  providers: [ContaPagarService],
})
export class ContaPagarModule {}
