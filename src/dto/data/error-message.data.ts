import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ErrorMessage {
  @ApiProperty({
    description: '',
    required: true,
  })
  @IsString()
  message: string;
}
