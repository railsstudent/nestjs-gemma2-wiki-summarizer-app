import { Module } from '@nestjs/common';
import { GroqChatModelProvider } from './application/providers/groq-chat-model.provider';
import { ToolsByNameProvider, ToolsProvider } from './application/providers/wiki-tool.provider';
import { WikiToolService } from './application/wiki-tool.service';

@Module({
  providers: [GroqChatModelProvider, WikiToolService, ToolsProvider, ToolsByNameProvider],
  exports: [WikiToolService],
})
export class ChatModelModule {}
