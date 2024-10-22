import { ChatGroq } from '@langchain/groq';
import { Inject, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GroqConfig } from '~configs/types/groq-config.type';
import { GROQ_CHAT_MODEL } from '../constants/groq-chat-model.constant';

export function InjectChatModel() {
  return Inject(GROQ_CHAT_MODEL);
}

export const GroqChatModelProvider: Provider<ChatGroq> = {
  provide: GROQ_CHAT_MODEL,
  useFactory: (configService: ConfigService) => {
    const { apiKey, model } = configService.get<GroqConfig>('groq');
    return new ChatGroq({
      apiKey,
      model,
      temperature: 0.3,
      maxTokens: 2048,
      streaming: false,
    });
  },
  inject: [ConfigService],
};
