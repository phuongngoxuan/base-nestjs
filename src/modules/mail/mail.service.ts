import { Injectable } from '@nestjs/common';
import { MailDto } from './dto/mail.dto';

@Injectable()
export class MailService {
  sendMail = async (mailDto: MailDto): Promise<void> => {
    console.log('mailDto', mailDto);
  };
}
