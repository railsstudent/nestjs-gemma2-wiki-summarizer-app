import { Module } from '@nestjs/common';
import { WikiToolService } from './application/wiki-tool.service';
import { WikipediaToolProvider } from './application/providers/wiki-tool.provider';
import { GroqChatModelProvider } from './application/providers/groq-chat-model.provider';

@Module({
  providers: [WikipediaToolProvider, GroqChatModelProvider, WikiToolService],
  exports: [WikiToolService],
})
export class ChatModelModule {}
