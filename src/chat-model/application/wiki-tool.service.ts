import { Runnable } from '@langchain/core/runnables';
import { Injectable } from '@nestjs/common';
import { Tool } from './interfaces/tool.interface';
import { InjectChatModel } from './providers/groq-chat-model.provider';

@Injectable()
export class WikiToolService implements Tool {
  constructor(@InjectChatModel() private llmWithTools: Runnable) {
    this.llmWithTools.invoke('Tell me about Momo Watanabe').then((response) => console.log(response));
  }

  async execute(argument: unknown): Promise<string> {
    return Promise.resolve(`${argument}`);
  }
}
