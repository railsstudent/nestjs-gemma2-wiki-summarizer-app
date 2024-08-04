import { ChatGroq } from '@langchain/groq';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GroqConfig } from '~configs/types/groq-config.type';
import { GROQ_CHAT_MODEL } from '../constants/groq-chat-model.constant';

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

// const groqModel = initChatModel('', )
