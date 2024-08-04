import { Controller, Get, Render } from '@nestjs/common';
import { WikiToolService } from '~chat-model/application/wiki-tool.service';

@Controller()
export class AppController {
  constructor(private service: WikiToolService) {}

  @Render('index')
  @Get()
  async getHello(): Promise<Record<string, string>> {
    console.log(await this.service.execute('what is 1 + 1?  Give me the answer'));
    return {
      title: 'Hello World 2025!',
    };
  }
}
