import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(
    file: Express.Multer.File,
    folder: string,
    userId: number,
  ): Promise<string> {
    try {
      // Converter o arquivo para base64
      const base64 = this.convertToBase64(file);

      // Upload para o Cloudinary
      const result = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload(
          base64,
          {
            folder, // pasta no Cloudinary (ex: 'profile-pictures')
            public_id: `user-${userId}-${Date.now()}`, // nome único do arquivo
            overwrite: true, // sobrescrever se existir
            transformation: [
              { width: 500, height: 500, crop: 'limit' }, // redimensionar
              { quality: 'auto:good' }, // otimizar qualidade
            ],
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
      });

      // Retorna a URL segura da imagem
      return result.secure_url;
    } catch (error) {
      console.error('Erro ao fazer upload para o Cloudinary:', error);
      throw new Error(`Falha ao fazer upload da imagem: ${error.message}`);
    }
  }

  private convertToBase64(file: Express.Multer.File): string {
    return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
  }
}
