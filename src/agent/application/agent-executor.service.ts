import { AIMessage, HumanMessage } from '@langchain/core/messages';
import { Injectable } from '@nestjs/common';
import { AgentExecutor } from 'langchain/agents';
import { ToolExecutor } from './interfaces/tool.interface';
import { InjectAgent } from './providers/agent-executor.provider';
import { AgentContent } from './types/agent-content.type';

@Injectable()
export class AgentExecutorService implements ToolExecutor {
  private chatHistory = [];

  constructor(@InjectAgent() private agentExecutor: AgentExecutor) {}

  async execute(input: string): Promise<AgentContent[]> {
    const { output } = await this.agentExecutor.invoke({ input, chat_history: this.chatHistory });

    this.chatHistory = this.chatHistory.concat([new HumanMessage(input), new AIMessage(output)]);
    if (this.chatHistory.length > 10) {
      // remove the oldest Human and AI Messages
      this.chatHistory.splice(0, 2);
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
