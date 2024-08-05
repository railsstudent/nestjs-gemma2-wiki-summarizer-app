import { Injectable } from '@nestjs/common';
import { AgentExecutorService } from '~chat-model/application/agent-executor.service';

@Injectable()
export class SummarizerService {
  constructor(private service: AgentExecutorService) {}

  getSummary() {
    return this.service.execute('What is the capital of France?');
  }
}
