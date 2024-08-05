import { DuckDuckGoSearch } from '@langchain/community/tools/duckduckgo_search';
import { Tool } from '@langchain/core/tools';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DuckDuckGoConfig } from '~configs/types/duck-config.type';
import { TOOLS } from '../constants/tools.constant';

export const ToolsProvider: Provider<Tool[]> = {
  provide: TOOLS,
  useFactory: (service: ConfigService) => {
    const { maxResults } = service.get<DuckDuckGoConfig>('duckDuckGo');
    const duckTool = new DuckDuckGoSearch({ maxResults });
    return [duckTool];
  },
  inject: [ConfigService],
};
