import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Configura o CORS para permitir o frontend
    app.enableCors({
        origin: 'http://localhost:5173', // Permite a origem do frontend (ajuste conforme necessário)
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
        allowedHeaders: 'Content-Type, Authorization', // Cabeçalhos permitidos
    });

    await app.listen(3000);
}

bootstrap();
