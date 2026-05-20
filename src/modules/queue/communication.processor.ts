import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { EmailService } from '../../utils/email.service';
import { TwilioService } from '../../utils/twilio.service';
import { Logger } from '@nestjs/common';

@Processor('communication')
export class CommunicationProcessor extends WorkerHost {
  private readonly logger = new Logger(CommunicationProcessor.name);

  constructor(
    private readonly emailService: EmailService,
    private readonly twilioService: TwilioService,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.debug(`Processing job ${job.id} of type ${job.name}`);

    switch (job.name) {
      case 'sendEmail':
        const { email, otp: emailOtp } = job.data;
        return await this.emailService.sendOtp(email, emailOtp);

      case 'sendSms':
        const { phone, otp: smsOtp } = job.data;
        return await this.twilioService.sendSms(
          phone,
          `Your verification OTP is ${smsOtp}`,
        );

      default:
        this.logger.error(`Unknown job type: ${job.name}`);
    }
  }
}
