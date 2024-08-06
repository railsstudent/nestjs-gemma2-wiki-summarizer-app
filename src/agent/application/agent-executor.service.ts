import { AIMessage, BaseMessage, HumanMessage } from '@langchain/core/messages';
import { Injectable } from '@nestjs/common';
import { AgentExecutor } from 'langchain/agents';
import { ToolExecutor } from './interfaces/tool.interface';
import { InjectAgent } from './providers/agent-executor.provider';
import { AgentContent } from './types/agent-content.type';

@Injectable()
export class AgentExecutorService implements ToolExecutor {
  private chat_history: BaseMessage[] = [];

  constructor(@InjectAgent() private agentExecutor: AgentExecutor) {}

  async execute(query: unknown): Promise<AgentContent[]> {
    const input = query as string;
    const { output } = await this.agentExecutor.invoke({ input, chat_history: this.chat_history });
    this.chat_history = this.chat_history.concat([new HumanMessage(input), new AIMessage(output)]);
    if (this.chat_history.length > 10) {
      this.chat_history.shift();
    }

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
