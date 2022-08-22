import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { Job } from 'bull';
@Processor('mail')
export class MailProcessor {
  private logger: Logger = new Logger('Processor Mail');
  constructor(
    private readonly mailerService: MailerService,
    @InjectQueue('mail') private readonly emailQueue: Queue,
  ) {}

  @Process('sendMail')
  async sendMail(job: Job): Promise<void> {
    const mailBody: any = job.data;
    await this.mailerService.sendMail({
      from: mailBody.from,
      to: mailBody.to,
      subject: mailBody.subject,
      template: mailBody.template,
      context: mailBody.context,
    });
  }
}
