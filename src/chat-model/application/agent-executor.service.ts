import { Injectable } from '@nestjs/common';
import { AgentExecutor } from 'langchain/agents';
import { ToolExecutor } from './interfaces/tool.interface';
import { InjectAgent } from './providers/agent-executor.provider';

@Injectable()
export class AgentExecutorService implements ToolExecutor {
  constructor(@InjectAgent() private agentExecutor: AgentExecutor) {}

  async execute(query: unknown): Promise<string> {
    const aiMessage2 = await this.agentExecutor.invoke({ input: query as string });
    return aiMessage2.output;
  }
}
