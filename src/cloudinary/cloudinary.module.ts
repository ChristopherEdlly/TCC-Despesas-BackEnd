import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],  // Importação do ConfigModule para ter acesso ao ConfigService
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
