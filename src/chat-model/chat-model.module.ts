import { Module } from '@nestjs/common';
import { GroqChatModelProvider, GroqChatModelToolsProvider } from './application/providers/groq-chat-model.provider';
import { ToolsByNameProvider, ToolsProvider } from './application/providers/wiki-tool.provider';
import { WikiToolService } from './application/wiki-tool.service';

@Module({
  providers: [GroqChatModelToolsProvider, GroqChatModelProvider, WikiToolService, ToolsProvider, ToolsByNameProvider],
  exports: [WikiToolService, GroqChatModelProvider],
})
export class ChatModelModule {}
