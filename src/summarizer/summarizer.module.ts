import { Module } from '@nestjs/common';
import { ChatModelModule } from '~chat-model/chat-model.module';
import { SummarizerService } from './application/summarizer.service';
import { SummarizerController } from './presentation/summarizer.controller';

@Module({
  imports: [ChatModelModule],
  controllers: [SummarizerController],
  providers: [SummarizerService],
})
export class SummarizerModule {}
