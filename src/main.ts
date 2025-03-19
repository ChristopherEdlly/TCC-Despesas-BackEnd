import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Configuração CORS mais robusta
    app.enableCors({
        origin: process.env.ALLOWED_ORIGINS ?
                process.env.ALLOWED_ORIGINS.split(',') :
                ['https://tcc-despesas-front-end.vercel.app', 'http://localhost:5173', 'http://localhost:3000'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',  // Adicionando OPTIONS explicitamente
        allowedHeaders: 'Content-Type, Accept, Authorization',
        credentials: true,
        maxAge: 86400
    });

    // Usar porta dinâmica para o Render
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Aplicação rodando na porta ${port}`);
}

bootstrap();
