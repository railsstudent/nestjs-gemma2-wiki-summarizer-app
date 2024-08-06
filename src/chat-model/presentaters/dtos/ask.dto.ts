import { IsNotEmpty, IsString } from 'class-validator';

export class AskDto {
  @IsString()
  @IsNotEmpty()
  query: string;
}
