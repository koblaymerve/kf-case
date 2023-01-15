import { Module } from '@nestjs/common';
import { OutageModule } from './outages/outage.module';

@Module({
  imports: [
    OutageModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
