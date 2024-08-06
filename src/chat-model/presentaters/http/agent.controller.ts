import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AskDto } from '../dtos/ask.dto';
import { AgentExecutorService } from '~chat-model/application/agent-executor.service';

@Controller('agent')
export class AgentController {
  constructor(private service: AgentExecutorService) {}

  @ApiBody({
    description: 'An intance of AskDto',
    required: true,
    schema: {
      type: 'object',
      properties: {
        Query: {
          type: 'string',
          description: 'query',
        },
      },
    },
    examples: {
      hongKongHistory: {
        value: {
          query: 'Please write a paragraph about the history of Hong Kong.',
        },
      },
      basketball: {
        value: {
          query: 'Generative AI',
        },
      },
    },
  })
  @ApiResponse({
    description: 'Generate answer in a rag aplication about technology book',
    type: String,
    status: HttpStatus.CREATED,
  })
  @Post()
  async ask(@Body() dto: AskDto): Promise<string> {
    await this.service.execute(dto.query);
    //return toDivRow(conversation);
    return '';
  }
}
