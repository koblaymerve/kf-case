import { Injectable } from '@nestjs/common';
import { AbstractServiceClient } from '../utils/service-caller';
import { EnhancedOutages } from 'src/dto/enhanced-outages.request.dto';

@Injectable()
export class OutageServiceCaller extends AbstractServiceClient {
  protected X_API_KEY = 'EltgJ5G8m44IzwE6UN2Y4B4NjPW77Zk6FJK3lL23';
  constructor() {
    super('https://api.krakenflex.systems/interview-tests-mock-api/v1');
  }

  setXApiKey(x_api_key: string) {
    this.X_API_KEY = x_api_key;
  }

  async getOutages(): Promise<any> {
    console.log('[OutageServiceCaller] getOutages');

    const response = await this.request(
      'GET',
      '/outages',
      {},
      { 'x-api-key': this.X_API_KEY },
    );
    return response;
  }

  async getSiteInfo(siteId: string): Promise<any> {
    console.log('[OutageServiceCaller] getSiteInfo');

    return this.request(
      'GET',
      `/site-info/${siteId}`,
      {},
      { 'x-api-key': this.X_API_KEY },
    );
  }

  async setSiteOutage(
    siteId: string,
    outageCreateRequestDto: EnhancedOutages[],
  ): Promise<any> {
    console.log('[OutageServiceCaller] setSiteOutage');

    return this.request(
      'POST',
      `/site-outages/${siteId}`,
      outageCreateRequestDto,
      { 'x-api-key': this.X_API_KEY },
    );
  }
}
