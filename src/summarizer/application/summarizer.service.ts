import { Injectable } from '@nestjs/common';
import { WikiToolService } from '~chat-model/application/wiki-tool.service';

@Injectable()
export class SummarizerService {
  constructor(private service: WikiToolService) {
    this.service.execute('Fukigen Death').then((result) => console.log(result));
  }
}
