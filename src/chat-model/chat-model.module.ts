import { Module } from '@nestjs/common';
import { AgentExecutorProvider } from './application/providers/agent-executor.provider';
import { GroqChatModelProvider, GroqChatModelToolsProvider } from './application/providers/groq-chat-model.provider';
import { ToolsByNameProvider, ToolsProvider } from './application/providers/wiki-tool.provider';
import { WikiToolService } from './application/wiki-tool.service';

@Module({
  providers: [
    AgentExecutorProvider,
    GroqChatModelToolsProvider,
    GroqChatModelProvider,
    WikiToolService,
    ToolsProvider,
    ToolsByNameProvider,
  ],
  exports: [WikiToolService, GroqChatModelProvider],
})
export class ChatModelModule {}
