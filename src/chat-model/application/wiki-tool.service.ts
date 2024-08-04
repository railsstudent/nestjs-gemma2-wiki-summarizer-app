import { WikipediaQueryRun } from '@langchain/community/tools/wikipedia_query_run';
import { Inject, Injectable } from '@nestjs/common';
import { WIKIPEDIA_TOOL_TOKEN } from './constants/wiki-tool.constant';
import { Tool } from './interfaces/tool.interface';
import { GROQ_CHAT_MODEL } from './constants/groq-chat-model.constant';
import { ChatGroq } from '@langchain/groq';

@Injectable()
export class WikiToolService implements Tool {
  constructor(
    @Inject(WIKIPEDIA_TOOL_TOKEN) private tool: WikipediaQueryRun,
    @Inject(GROQ_CHAT_MODEL) llm: ChatGroq,
  ) {
    console.log(llm);
  }

  async execute(argument: unknown): Promise<string> {
    const result = await this.tool.invoke(argument as string);
    if (result === null || typeof result === 'undefined') {
      return '';
    }

    if (Array.isArray(result) && result.length) {
      return `${result[0]}`;
    }

    return `${result}`;
  }
}
