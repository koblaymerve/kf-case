import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EnhancedOutages {
  @ApiProperty({
    description: 'The device ID the outage pertains to',
    required: true,
    example: '111183e7-fb90-436b-9951-63392b36bdd2',
  })
  @IsString()
  id = '111183e7-fb90-436b-9951-63392b36bdd2';

  @ApiProperty({
    description: 'The display name of the device the outage pertains to',
    required: true,
    example: 'Battery 1',
  })
  @IsString()
  name = 'Battery 1';

  @ApiProperty({
    description: 'Exersice begin date time',
    required: true,
    example: '2022-01-01T00:00:00.000Z',
  })
  @IsString()
  begin = '2022-01-01T00:00:00.000Z';

  @ApiProperty({
    description: 'Exersice end date time',
    required: true,
    example: '2022-01-02T12:01:59.123Z',
  })
  @IsString()
  end = '2023-01-02T12:01:59.123Z';
}
