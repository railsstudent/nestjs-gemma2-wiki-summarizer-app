import { DuckDuckGoSearch } from '@langchain/community/tools/duckduckgo_search';
import { Tool } from '@langchain/core/tools';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AngularDocsService } from '~angular-docs/application/angular-docs.service';
import { DuckDuckGoConfig } from '~configs/types/duck-config.type';
import { TOOLS } from '../constants/tools.constant';
import { DragonBallService } from '../dragon-ball.service';

export const ToolsProvider: Provider<Tool[]> = {
  provide: TOOLS,
  useFactory: async (service: ConfigService, dragonBallService: DragonBallService, docsService: AngularDocsService) => {
    const { maxResults } = service.get<DuckDuckGoConfig>('duckDuckGo');
    const duckTool = new DuckDuckGoSearch({ maxResults });
    const characterFiltertool = dragonBallService.createCharactersFilterTool();
    const retrieverTools = await docsService.createRetrieverTools();
    return [duckTool, characterFiltertool, ...retrieverTools];
  },
  inject: [ConfigService, DragonBallService, AngularDocsService],
};
