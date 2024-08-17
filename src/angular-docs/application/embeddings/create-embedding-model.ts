import { TaskType } from '@google/generative-ai';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { ConfigService } from '@nestjs/config';
import { EmbeddingModelConfig } from '../types/embedding-model-config.type';

export function createTextEmbeddingModel(configService: ConfigService, title = 'Angular') {
  const { apiKey, embeddingModel: model } = configService.get<EmbeddingModelConfig>('gemini');
  return new GoogleGenerativeAIEmbeddings({
    apiKey,
    model,
    taskType: TaskType.RETRIEVAL_DOCUMENT,
    title,
  });
}
