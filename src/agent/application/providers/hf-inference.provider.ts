import { HuggingFaceInference } from '@langchain/community/llms/hf';
import { Inject, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HFConfig } from '~configs/types/hf-config.type';
import { HF_INFERENCE } from '../constants/hf.constant';

export function InjectHFInference() {
  return Inject(HF_INFERENCE);
}

export const HFInferenceProvider: Provider<HuggingFaceInference> = {
  provide: HF_INFERENCE,
  useFactory: (configService: ConfigService) => {
    const { apiKey, model } = configService.get<HFConfig>('huggingface');
    return new HuggingFaceInference({
      apiKey,
      model,
      topK: 10,
      topP: 0.7,
      temperature: 0.1,
      maxTokens: 1024,
    });
  },
  inject: [ConfigService],
};
