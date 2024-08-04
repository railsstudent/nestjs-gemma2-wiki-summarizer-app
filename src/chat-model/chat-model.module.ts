import { Module } from '@nestjs/common';
import { WikiToolService } from './application/wiki-tool.service';
import { WikipediaToolProvider } from './application/providers/wiki-tool.provider';
import { GroqChatModelProvider } from './application/providers/groq-chat-model.provider';
import { TOOLS, WIKIPEDIA_TOOL_TOKEN } from './application/constants/wiki-tool.constant';

@Module({
  providers: [
    WikipediaToolProvider,
    GroqChatModelProvider,
    WikiToolService,
    {
      provide: TOOLS,
      useFactory: (wikiTool: any) => [wikiTool],
      inject: [WIKIPEDIA_TOOL_TOKEN],
    },
  ],
  exports: [WikiToolService],
})
export class ChatModelModule {}
