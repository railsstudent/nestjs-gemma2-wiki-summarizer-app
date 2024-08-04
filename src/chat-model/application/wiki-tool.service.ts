import { WikipediaQueryRun } from '@langchain/community/tools/wikipedia_query_run';
import { ChatGroq } from '@langchain/groq';
import { Injectable } from '@nestjs/common';
import { Tool } from './interfaces/tool.interface';
import { InjectChatModel } from './providers/groq-chat-model.provider';
import { InjectWikipediaTool } from './providers/wiki-tool.provider';

@Injectable()
export class WikiToolService implements Tool {
  constructor(
    @InjectWikipediaTool() private tool: WikipediaQueryRun,
    @InjectChatModel() private llm: ChatGroq,
  ) {}

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
