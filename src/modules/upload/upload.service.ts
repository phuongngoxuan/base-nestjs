import { BadRequestException, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { UploadFileDto } from './dto/upload.dto';
import { UploadFileType } from './type/upload.type';
const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  region: process.env.AWS_BUCKET_REGION,
});
@Injectable()
export class UploadService {
  async deleteFile(key: string): Promise<void> {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    };
    await s3.deleteObject(params).promise();
  }

  async uploadFile(file: Express.Multer.File): Promise<UploadFileType> {
    if (!file) {
      throw new BadRequestException();
    }

    // upload image
    const { location, key } = await this.upload(file);

    return { location, key };
  }

  async upload(
    file: Express.Multer.File,
  ): Promise<{ location: string; key: string }> {
    const myFile = file.originalname.split('.');
    let fileType = myFile[myFile.length - 1];
    // for image svg not download not good pending change ...
    if (fileType === 'svg') {
      fileType = 'svg+xml';
    }
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${new Date().toISOString()}.${fileType}`,
      Body: file.buffer,
      ContentDisposition: 'inline',
      ContentType: `image/${fileType}`,
      ACL: 'public-read',
    };
    const { Location, Key } = await s3.upload(params).promise();

    return { location: Location, key: Key };
  }
}
