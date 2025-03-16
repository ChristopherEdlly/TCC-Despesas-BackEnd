import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateUsuarioDto } from './dto/update-usuario.dto.js';
import { UsuarioService } from './usuario.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('usuario')
@UseGuards(AuthGuard)
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly cloudinaryService: CloudinaryService, // Injetado corretamente
  ) {}

  @Get(':nome')
  async PesquisarUsuarios(@Param('nome') nome: string, @Req() req) {
    return this.usuarioService.buscarUsuarioPorNome(nome);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUsuarioDto,
    @Req() req,
  ) {
    const usuarioId = req.user.id;

    if (+id !== +usuarioId) {
      throw new ForbiddenException(
        'Usuário não tem permissão para editar este usuario.',
      );
    }

    return this.usuarioService.atualizarUsuario(+id, data);
  }

  @Post('upload-foto')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(
            new BadRequestException('Somente imagens são permitidas!'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadFoto(@UploadedFile() file: Express.Multer.File, @Req() req) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    try {
      const userId = req.user.id;

      // Fazer upload da imagem para o Cloudinary
      const fotoPerfil = await this.cloudinaryService.uploadImage(
        file,
        'profile-pictures', // pasta no Cloudinary
        userId,
      );
      await this.usuarioService.atualizarUsuario(userId, {
        fotoPerfil,
      });

      return {
        message: 'Foto de perfil atualizada com sucesso',
        fotoPerfil,
      };
    } catch (error) {
      throw new BadRequestException(
        `Falha ao fazer upload da imagem: ${error.message}`,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req) {
    const usuarioId = req.user.id;
    if (id !== usuarioId) {
      throw new ForbiddenException(
        'Usuário não tem permissão para deletar esta esse usuario.',
      );
    }

    return this.usuarioService.removerUsuario(+id);
  }

  @Get()
  async buscarPerfil(@Req() req) {
    const usuarioId = req.user.id;
    const usuario = await this.usuarioService.buscarPorId(usuarioId);

    if (!usuario) {
      throw new ForbiddenException('Usuário não encontrado.');
    }

    const nomeCompleto = usuario.nome;
    const primeiroNome = nomeCompleto.split(' ')[0];

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      primeiroNome,
      fotoPerfil: usuario.fotoPerfil,
    };
  }

  @Get('email/:email')
  async buscarPorEmail(@Param('email') email: string) {
    return this.usuarioService.buscarUsuarioPorEmail(email);
  }
}
