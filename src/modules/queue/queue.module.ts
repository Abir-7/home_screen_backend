import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommunicationProcessor } from './communication.processor';
import { EmailService } from '../../utils/email.service';
import { TwilioService } from '../../utils/twilio.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST', 'localhost'),
          port: configService.get('REDIS_PORT', 6379),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'communication',
    }),
  ],
  providers: [CommunicationProcessor, EmailService, TwilioService],
})
export class QueueModule {}
