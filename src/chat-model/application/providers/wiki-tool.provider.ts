import { WikipediaQueryRun } from '@langchain/community/tools/wikipedia_query_run';
import { Inject, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WikipediaConfig } from '~configs/types/wikipedia-config.type';
import { WIKIPEDIA_TOOL_TOKEN } from '../constants/wiki-tool.constant';

export function InjectWikipediaTool() {
  return Inject(WIKIPEDIA_TOOL_TOKEN);
}

export const WikipediaToolProvider: Provider<WikipediaQueryRun> = {
  provide: WIKIPEDIA_TOOL_TOKEN,
  useFactory: (service: ConfigService) => {
    const { topKResults, maxDocContentLength } = service.get<WikipediaConfig>('wikipedia');
    return new WikipediaQueryRun({
      topKResults,
      maxDocContentLength,
    });
  },
  inject: [ConfigService],
};