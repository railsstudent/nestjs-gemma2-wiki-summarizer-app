import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import configuration from '~configs/configuration';
import { throttlerConfig } from '~configs/throttler.config';
import { AppController } from './app.controller';
import { ChatModelModule } from './chat-model/chat-model.module';

@Module({
  imports: [
    throttlerConfig,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ChatModelModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
