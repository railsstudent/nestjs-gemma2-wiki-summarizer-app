import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AngularDocsModule } from '~angular-docs/angular-docs.module';
import { AgentExecutorService } from './application/agent-executor.service';
import { DragonBallService } from './application/dragon-ball.service';
import { AgentExecutorProvider } from './application/providers/agent-executor.provider';
import { GroqChatModelProvider } from './application/providers/groq-chat-model.provider';
import { ToolsProvider } from './application/providers/tools.provider';
import { AgentController } from './presenters/http/agent.controller';

@Module({
  imports: [HttpModule, AngularDocsModule],
  providers: [AgentExecutorProvider, GroqChatModelProvider, AgentExecutorService, ToolsProvider, DragonBallService],
  controllers: [AgentController],
})
export class AgentModule {}
