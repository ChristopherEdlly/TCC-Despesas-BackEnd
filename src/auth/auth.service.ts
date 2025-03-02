import {
    Inject,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    @Inject()
    private readonly prisma: PrismaService;

    @Inject()
    private readonly jwtService: JwtService;

    async signin({ email, senha }: { email: string; senha: string }) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { email },
        });

        if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const token = this.jwtService.sign({
            id: usuario.id,
            email: usuario.email,
        });

        return { token };
    }
}
