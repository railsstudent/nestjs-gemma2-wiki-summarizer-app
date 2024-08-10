import { Injectable } from '@nestjs/common';
import { AgentExecutor } from 'langchain/agents';
import { ToolExecutor } from './interfaces/tool.interface';
import { InjectAgent } from './providers/agent-executor.provider';
import { AgentContent } from './types/agent-content.type';

@Injectable()
export class AgentExecutorService implements ToolExecutor {
  constructor(@InjectAgent() private agentExecutor: AgentExecutor) {}

  async execute(input: string): Promise<AgentContent[]> {
    const { output } = await this.agentExecutor.invoke({ input });
    return [
      {
        role: 'Human',
        content: input,
      },
      {
        role: 'Assistant',
        content: output,
      },
    ];
  }
}
