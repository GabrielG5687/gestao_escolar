import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadsService {
  private uploadPath: string;

  constructor(private configService: ConfigService) {
    this.uploadPath = this.configService.get<string>('UPLOAD_PATH', './uploads');
    
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async saveFile(file: Express.Multer.File): Promise<string> {
    const filename = `${Date.now()}-${file.originalname}`;
    const filepath = path.join(this.uploadPath, filename);
    
    fs.writeFileSync(filepath, file.buffer);
    
    return `/uploads/${filename}`;
  }

  async saveMultipleFiles(files: Express.Multer.File[]): Promise<string[]> {
    const urls: string[] = [];
    
    for (const file of files) {
      const url = await this.saveFile(file);
      urls.push(url);
    }
    
    return urls;
  }

  getFilePath(filename: string): string {
    return path.join(this.uploadPath, filename);
  }
}
