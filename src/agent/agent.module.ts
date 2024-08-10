import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AgentExecutorService } from './application/agent-executor.service';
import { AgentExecutorProvider } from './application/providers/agent-executor.provider';
import { GroqChatModelProvider } from './application/providers/groq-chat-model.provider';
import { ToolsProvider } from './application/providers/tools.provider';
import { AgentController } from './presenters/http/agent.controller';
import { DragonBallService } from './application/dragon-ball.service';

@Module({
  imports: [HttpModule],
  providers: [AgentExecutorProvider, GroqChatModelProvider, AgentExecutorService, ToolsProvider, DragonBallService],
  controllers: [AgentController],
})
export class AgentModule {}
