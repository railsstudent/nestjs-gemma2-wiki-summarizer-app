import { Controller, Get, Render } from '@nestjs/common';
import { WikiToolService } from '~chat-model/application/wiki-tool.service';

@Controller()
export class AppController {
  constructor(private wikiService: WikiToolService) {}

  @Render('index')
  @Get()
  async getHello(): Promise<Record<string, string>> {
    const result = await this.wikiService.execute('Summerslam');
    console.log(typeof result);
    return {
      title: 'Hello World 2025!',
    };
  }
}
