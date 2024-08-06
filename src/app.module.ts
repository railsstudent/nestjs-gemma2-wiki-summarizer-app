import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AgentModule } from '~agent/agent.module';
import configuration from '~configs/configuration';
import { throttlerConfig } from '~configs/throttler.config';
import { AppController } from './app.controller';

@Module({
  imports: [
    throttlerConfig,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AgentModule,
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
