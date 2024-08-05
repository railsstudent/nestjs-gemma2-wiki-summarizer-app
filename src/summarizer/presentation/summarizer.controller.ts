import { Controller, Get } from '@nestjs/common';
import { SummarizerService } from '~summarizer/application/summarizer.service';

@Controller('summarizer')
export class SummarizerController {
  constructor(private service: SummarizerService) {}

  @Get()
  async getResult() {
    const result = await this.service.getSummary();
    return result;
  }
}
