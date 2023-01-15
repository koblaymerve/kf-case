import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Devices {
  @ApiProperty({
    description: 'The device ID',
    required: true,
    example: '44c02564-a229-4f51-8ded-cc7bcb202566',
  })
  @IsString()
  id = '44c02564-a229-4f51-8ded-cc7bcb202566';

  @ApiProperty({
    description: 'The display name of the device',
    required: true,
    example: 'Battery 1',
  })
  @IsString()
  name = 'Battery 1';
}

export class SiteInfo {
  @ApiProperty({
    description: 'The ID of the site',
    required: true,
    example: 'pear-tree',
  })
  @IsString()
  id = 'pear-tree';

  @ApiProperty({
    description: 'The display name of the site',
    required: true,
    example: 'Pear Tree',
  })
  @IsString()
  name = 'Pear Tree';

  @ApiProperty({
    type: Devices,
    isArray: true,
  })
  @IsArray()
  devices = [Devices];
}
