import { Injectable } from '@nestjs/common';
import { OutageServiceCaller } from './outage-service-caller';

@Injectable()
export class OutageService {
  constructor(protected readonly serviceCaller: OutageServiceCaller) {}

  async calculateOutages(siteId: string) {
    const { serviceCaller } = this;
    const outages = await serviceCaller.getOutages();
    const norwichSiteInfo = await serviceCaller.getSiteInfo(siteId);

    if (!!outages.data && !!norwichSiteInfo.data) {
      const devices = norwichSiteInfo.data.devices;
      const afterTheDate = outages.data.filter(
        (outage) =>
          new Date(outage.begin) >= new Date('2022-01-01T00:00:00.000Z'),
      );
      const updatedOutages = afterTheDate.map((outage) => {
        const device = devices.find((device) => device.id === outage.id);
        return { ...outage, name: device?.name };
      });

      const out = updatedOutages.filter((a) => a.name);
      return serviceCaller.setSiteOutage(siteId, out);
    }
  }
}
