import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AtGuards } from '../../common/guards/at.guards';
import { UploadFileDto } from './dto/upload.dto';
import { UploadFileType } from './type/upload.type';
import { UploadService } from './upload.service';
import { DeleteFileDto } from './dto/delete.dto';

@ApiBearerAuth('defaultBearerAuth')
@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  // @UseGuards(AtGuards)
  @HttpCode(HttpStatus.OK)
  @Post('image')
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ type: UploadFileDto })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: UploadFileDto,
  ): Promise<UploadFileType> {
    const dataUpload = await this.uploadService.uploadFile(file);
    return { ...dataUpload };
  }

  @HttpCode(HttpStatus.OK)
  @Delete('image')
  @ApiCreatedResponse({ type: UploadFileDto })
  @UseInterceptors(FileInterceptor('image'))
  async deleteFile(@Body() data: DeleteFileDto): Promise<{ message: string }> {
    await this.uploadService.deleteFile(data.key);
    return { message: 'delete image success' };
  }
}
