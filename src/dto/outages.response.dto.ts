import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Outages {

  @ApiProperty({
    description: 'The device ID the outage pertains to',
    required: true,
    example: '44c02564-a229-4f51-8ded-cc7bcb202566',
  })
  @IsString()
  id = '44c02564-a229-4f51-8ded-cc7bcb202566';

  @ApiProperty({
    description: 'Outage begin date time',
    required: true,
    example: '2022-01-01T00:00:00.000Z',
  })
  @IsString()
  begin = '2022-01-01T00:00:00.000Z';

  @ApiProperty({
    description: 'Outage end date time',
    required: true,
    example: '2022-01-02T12:01:59.123Z',
  })
  @IsString()
  end = '2022-01-02T12:01:59.123Z';
}
