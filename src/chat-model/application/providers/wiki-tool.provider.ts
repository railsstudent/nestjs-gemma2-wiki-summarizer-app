import { DuckDuckGoSearch } from '@langchain/community/tools/duckduckgo_search';
import { WikipediaQueryRun } from '@langchain/community/tools/wikipedia_query_run';
import { Tool } from '@langchain/core/tools';
import { Inject, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WikipediaConfig } from '~configs/types/wikipedia-config.type';
import { TOOLS, TOOLS_BY_NAME } from '../constants/wiki-tool.constant';

export const ToolsProvider: Provider<Tool[]> = {
  provide: TOOLS,
  useFactory: (service: ConfigService) => {
    const { topKResults, maxDocContentLength } = service.get<WikipediaConfig>('wikipedia');
    const wikiTool = new WikipediaQueryRun({
      topKResults,
      maxDocContentLength,
    });

    const searchTool = new DuckDuckGoSearch({ maxResults: 1 });
    return [wikiTool, searchTool];
  },
  inject: [ConfigService],
};

export function InjectToolsByName() {
  return Inject(TOOLS_BY_NAME);
}

export const ToolsByNameProvider = {
  provide: TOOLS_BY_NAME,
  useFactory: (tools: Tool[]) =>
    tools.reduce(
      (acc, tool) => {
        acc[tool.name] = tool;
        return acc;
      },
      {} as Record<string, Tool>,
    ),
  inject: [TOOLS],
};
