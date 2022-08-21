import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { Job } from 'bull';

@Processor('mail')
export class MailProcessor {
    private logger: Logger = new Logger('Processor Mail');
    constructor(private readonly mailerService: MailerService,
        @InjectQueue('mail') private readonly emailQueue: Queue) { }

    @Process('sendMail')
    async sendLiquidationCall(job: Job): Promise<void> {
        const mailBody: any = job.data;
        this.logger.debug(`Start job: sendMail ${mailBody.subject}`);
        try {
            console.log(job.data)
            throw new Error('database failed to connect');
            // await this.mailerService.sendMail({
            //     from: mailBody.from,
            //     to: mailBody.to,
            //     subject: mailBody.subject,
            //     template: mailBody.template,
            //     context: mailBody.context,
            // });
        } catch (e) {
            this.logger.debug(e);
        }
    }
}
