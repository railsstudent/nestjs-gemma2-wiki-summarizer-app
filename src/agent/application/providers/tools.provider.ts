import { DuckDuckGoSearch } from '@langchain/community/tools/duckduckgo_search';
import { Tool } from '@langchain/core/tools';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DuckDuckGoConfig } from '~configs/types/duck-config.type';
import { TOOLS } from '../constants/tools.constant';
import { DragonBallService } from '../dragon-ball.service';

export const ToolsProvider: Provider<Tool[]> = {
  provide: TOOLS,
  useFactory: (service: ConfigService, dragonBallService: DragonBallService) => {
    const { maxResults } = service.get<DuckDuckGoConfig>('duckDuckGo');
    const duckTool = new DuckDuckGoSearch({ maxResults });
    const characterFiltertool = dragonBallService.createCharactersFilterTool();
    return [duckTool, characterFiltertool];
  },
  inject: [ConfigService, DragonBallService],
};
