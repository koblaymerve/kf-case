import { Module } from '@nestjs/common';
import { OutageController } from './outage.controller';
import { OutageService } from './outage.service';
import { OutageServiceCaller } from './outage-service-caller';

@Module({
  imports: [],
  controllers: [OutageController],
  providers: [OutageService, OutageServiceCaller],
  exports: [OutageServiceCaller],
})
export class OutageModule {}
