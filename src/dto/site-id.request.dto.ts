import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SiteId {
  @ApiProperty({
    description: 'Identifier for a site',
    required: true,
    example: 'pear-tree',
  })
  @IsString()
  siteId = 'norwich-pear-tree';
}
