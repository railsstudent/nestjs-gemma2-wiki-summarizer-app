import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Render('index')
  @Get()
  async getHello(): Promise<Record<string, string>> {
    return {
      title: 'Wiki Summarizer',
    };
  }
}
