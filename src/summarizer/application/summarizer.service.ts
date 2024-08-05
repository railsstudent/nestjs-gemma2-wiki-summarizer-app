import { Injectable } from '@nestjs/common';
import { WikiToolService } from '~chat-model/application/wiki-tool.service';

@Injectable()
export class SummarizerService {
  constructor(private service: WikiToolService) {
    this.service.execute('Stardom wrestling').then((result) => console.log(result));
  }
}
