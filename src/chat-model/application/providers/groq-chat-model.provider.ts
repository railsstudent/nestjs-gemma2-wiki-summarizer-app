import { Runnable } from '@langchain/core/runnables';
import { ChatGroq } from '@langchain/groq';
import { Inject, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GroqConfig } from '~configs/types/groq-config.type';
import { GROQ_CHAT_MODEL } from '../constants/groq-chat-model.constant';
import { TOOLS } from '../constants/wiki-tool.constant';

export function InjectChatModel() {
  return Inject(GROQ_CHAT_MODEL);
}

export const GroqChatModelProvider: Provider<Runnable> = {
  provide: GROQ_CHAT_MODEL,
  useFactory: (configService: ConfigService, tools: any[]) => {
    const { apiKey, model } = configService.get<GroqConfig>('groq');
    const llmWithTools = new ChatGroq({
      apiKey,
      model,
      temperature: 0.1,
      maxTokens: 2048,
      streaming: false,
    }).bindTools(tools, {
      tool_choice: 'auto',
    });

    return llmWithTools;
  },
  inject: [ConfigService, TOOLS],
};
