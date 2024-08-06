import { AIMessage, BaseMessage, HumanMessage } from '@langchain/core/messages';
import { Injectable } from '@nestjs/common';
import { AgentExecutor } from 'langchain/agents';
import { AgentResponse } from './interfaces/agent-response.interface';
import { ToolExecutor } from './interfaces/tool.interface';
import { InjectAgent } from './providers/agent-executor.provider';

@Injectable()
export class AgentExecutorService implements ToolExecutor {
  private chat_history: BaseMessage[] = [];

  constructor(@InjectAgent() private agentExecutor: AgentExecutor) {}

  async execute(query: unknown): Promise<AgentResponse> {
    const input = query as string;
    const response = await this.agentExecutor.invoke({ input, chat_history: this.chat_history });
    this.chat_history = this.chat_history.concat([new HumanMessage(input), new AIMessage(response.output)]);
    if (this.chat_history.length > 10) {
      this.chat_history.shift();
    }

    return {
      input,
      output: response.output,
    };
  }
}
