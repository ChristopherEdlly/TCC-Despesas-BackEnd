import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ContaPagarService } from './conta-pagar.service';
import { CreateContaPagarDto } from './dto/create-conta-pagar.dto';
import { UpdateContaPagarDto } from './dto/update-conta-pagar.dto';

@Controller('conta-pagar')
export class ContaPagarController {
    constructor(private readonly contaPagarService: ContaPagarService) {}
}
