import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Render('index')
  @Get()
  getHello(): Record<string, string> {
    return {
      title: 'Hello World 2024!',
    };
  }
}
