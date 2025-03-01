import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    @Inject()
    private readonly jwtService: JwtService;

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorization = this.extractTokenFromHeader(request);
        if (!authorization)
            throw new UnauthorizedException('Token is required');

        try {
            const payload = this.jwtService.verify(authorization, {
                secret: process.env.JWT_SECRET,
            });
            console.log('Payload:', payload); // Adiciona este log para ver o conteúdo do payload
            request['user'] = payload; // Armazena o payload completo no objeto request
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] =
            request.headers['authorization']?.split(' ') || [];
        return type === 'Bearer' ? token : undefined;
    }
}
