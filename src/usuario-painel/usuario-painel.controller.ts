import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { UsuarioPainelService } from './usuario-painel.service';
import { CreateUsuarioPainelDto } from './dto/create-usuario-painel.dto';
import { UpdateUsuarioPainelDto } from './dto/update-usuario-painel.dto';

@Controller('usuario-painel')
export class UsuarioPainelController {
    constructor(private readonly usuarioPainelService: UsuarioPainelService) {}
}
