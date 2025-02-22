import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { PainelService } from './painel.service';

@Controller('painel')
export class PainelController {
    constructor(private readonly painelService: PainelService) {}
}
