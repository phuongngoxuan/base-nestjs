import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailDto } from './dto/mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}
  @Post()
  create(@Body() mailDto: MailDto): Promise<void> {
    return this.mailService.sendMail(mailDto);
  }
}
