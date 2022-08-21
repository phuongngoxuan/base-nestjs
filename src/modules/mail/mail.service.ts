import { MailerService } from '@nestjs-modules/mailer';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { MailDto } from './dto/mail.dto';
import { Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Cache } from 'cache-manager';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectQueue('mail') private readonly emailQueue: Queue,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  sendMail = async (mailDto: MailDto): Promise<void> => {


    await this.emailQueue.add('sendMail', {
      to: ["honganhnguyen8763@gmail.com"],
      from: "xuanngoktvt@gmail.com",
      subject: mailDto.message,
      template: process.cwd() + "/src/modules/mail/templates/claimReward.hbs",
      context: {},
    }, {
      backoff: 10,
      attempts: 10
    });
  }


  //   await this.mailerService.sendMail({
  //     from: "xuanngoktvt@gmail.com",
  //     to: ["honganhnguyen8763@gmail.com"],
  //     subject: "",
  //     template: process.cwd() + "/src/modules/mail/templates/claimReward.hbs",
  //     context: {
  //       time: "",
  //       walletAddress: "",
  //       amount: "",
  //       chain: "",
  //       stableCoin: "",
  //       pool: "",
  //       dueToUnlock: "",
  //       percent: "",
  //     },
  //   });
  // };
}
