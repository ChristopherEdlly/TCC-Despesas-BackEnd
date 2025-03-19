import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: [
            "https://tcc-despesas-front-end.vercel.app",
            "http://localhost:5173",  // mantendo para desenvolvimento local
            "http://localhost:3000"   // mantendo para desenvolvimento local
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Authorization',
        credentials: true
    });

    // Usar porta dinâmica para o Render
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Aplicação rodando na porta ${port}`);
}

bootstrap();
