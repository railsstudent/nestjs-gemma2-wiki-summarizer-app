import { Module } from '@nestjs/common';
import { AgentExecutorService } from './application/agent-executor.service';
import { AgentExecutorProvider } from './application/providers/agent-executor.provider';
import { GroqChatModelProvider } from './application/providers/groq-chat-model.provider';
import { ToolsProvider } from './application/providers/tools.provider';

@Module({
  providers: [AgentExecutorProvider, GroqChatModelProvider, AgentExecutorService, ToolsProvider],
  exports: [AgentExecutorService],
})
export class ChatModelModule {}
