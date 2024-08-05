import { Runnable } from '@langchain/core/runnables';
import { ChatGroq } from '@langchain/groq';
import { Inject, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GroqConfig } from '~configs/types/groq-config.type';
import { GROQ_CHAT_MODEL, GROQ_CHAT_MODEL_TOOLS } from '../constants/groq-chat-model.constant';
import { TOOLS } from '../constants/wiki-tool.constant';

export function InjectChatModelTools() {
  return Inject(GROQ_CHAT_MODEL_TOOLS);
}

export function InjectChatModel() {
  return Inject(GROQ_CHAT_MODEL);
}

export const GroqChatModelToolsProvider: Provider<Runnable> = {
  provide: GROQ_CHAT_MODEL_TOOLS,
  useFactory: (configService: ConfigService, tools: any[]) => {
    const { apiKey, model } = configService.get<GroqConfig>('groq');
    return new ChatGroq({
      apiKey,
      model,
      temperature: 0.1,
      maxTokens: 2048,
      streaming: false,
    }).bindTools(tools, {
      tool_choice: 'auto',
    });
  },
  inject: [ConfigService, TOOLS],
};

export const GroqChatModelProvider: Provider<ChatGroq> = {
  provide: GROQ_CHAT_MODEL,
  useFactory: (configService: ConfigService) => {
    const { apiKey, model } = configService.get<GroqConfig>('groq');
    return new ChatGroq({
      apiKey,
      model,
      temperature: 0.1,
      maxTokens: 2048,
      streaming: false,
    });
  },
  inject: [ConfigService],
};
