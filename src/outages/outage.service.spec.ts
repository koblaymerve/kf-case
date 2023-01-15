import { OutageService } from './outage.service';
import { OutageServiceCaller } from './outage-service-caller';

import * as mocked_outages from './mock-data/outages.json';
import * as mocked_site_info from './mock-data/site-info.json';

const siteId = 'norwich-pear-tree';

describe('OutageService', () => {
  let outageService: OutageService;
  let serviceCaller: OutageServiceCaller;

  describe('outageCalculate happy path', () => {
    beforeEach(() => {
      serviceCaller = new OutageServiceCaller();
      outageService = new OutageService(serviceCaller);
    });

    it('should set enhanced outages succesfully', async () => {
      jest
        .spyOn(serviceCaller, 'getOutages')
        .mockImplementation(() => Promise.resolve(mocked_outages));
      jest
        .spyOn(serviceCaller, 'getSiteInfo')
        .mockImplementation(() => Promise.resolve(mocked_site_info));

      const result = await outageService.calculateOutages(siteId);

      expect(result.statusText).toBe('OK');
      expect(result.status).toBe(200);
      expect(result.data).toEqual({});
    });
  });

  describe('outages', () => {
    beforeEach(() => {
      serviceCaller = new OutageServiceCaller();
      serviceCaller.setXApiKey('EltgJ5G8m44IzwE6UN2Y4B4NjPW77Zk6FJK3lL22');
      outageService = new OutageService(serviceCaller);
    });
    it('should return an error 403 with not valid x-api-key', async () => {
      jest
        .spyOn(serviceCaller, 'getSiteInfo')
        .mockImplementation(() => Promise.resolve(mocked_site_info));

      const result = await serviceCaller.getOutages();

      expect(result.statusText).toBe('Forbidden');
      expect(result.status).toBe(403);
      expect(result.code).toEqual('ERR_BAD_REQUEST');
    });

    it('should return an error 403 with not valid x-api-key', async () => {
      jest
        .spyOn(serviceCaller, 'getOutages')
        .mockImplementation(() => Promise.resolve(mocked_outages));

      const result = await serviceCaller.getSiteInfo(siteId);

      expect(result.statusText).toBe('Forbidden');
      expect(result.status).toBe(403);
      expect(result.code).toEqual('ERR_BAD_REQUEST');
    });

    it('should return an error 403 with not valid x-api-key', async () => {
      jest
        .spyOn(serviceCaller, 'getOutages')
        .mockImplementation(() => Promise.resolve(mocked_outages));

      const result = await serviceCaller.setSiteOutage(siteId, []);

      expect(result.statusText).toBe('Forbidden');
      expect(result.status).toBe(403);
      expect(result.code).toEqual('ERR_BAD_REQUEST');
    });
  });

  describe('site info', () => {
    beforeEach(() => {
      serviceCaller = new OutageServiceCaller();
      outageService = new OutageService(serviceCaller);
    });
    it('should return an array of outages succesfully', async () => {
      jest
        .spyOn(serviceCaller, 'getSiteInfo')
        .mockImplementation(() => Promise.resolve(mocked_site_info));

      const result = await serviceCaller.getOutages();

      expect(result.statusText).toBe('OK');
      expect(result.status).toBe(200);
    });

    it('should return site info succesfully', async () => {
      jest
        .spyOn(serviceCaller, 'getOutages')
        .mockImplementation(() => Promise.resolve(mocked_outages));

      const result = await serviceCaller.getSiteInfo(siteId);

      expect(result.statusText).toBe('OK');
      expect(result.status).toBe(200);
      expect(result.data).toEqual(mocked_site_info.data);
    });

    it('should return 404 with not exist site id for site info', async () => {
      jest
        .spyOn(serviceCaller, 'getOutages')
        .mockImplementation(() => Promise.resolve(mocked_outages));

      const result = await serviceCaller.getSiteInfo('siteId');

      expect(result.statusText).toBe('Not Found');
      expect(result.status).toBe(404);
      expect(result.code).toEqual('ERR_BAD_REQUEST');
    });

    it('should return 404 with not exist site id for outages', async () => {
      jest
        .spyOn(serviceCaller, 'getOutages')
        .mockImplementation(() => Promise.resolve(mocked_outages));

      const result = await serviceCaller.setSiteOutage('siteId', []);

      expect(result.statusText).toBe('Not Found');
      expect(result.status).toBe(404);
      expect(result.code).toEqual('ERR_BAD_REQUEST');
    });

    it('should return 400 with not valid payload', async () => {
      jest
        .spyOn(serviceCaller, 'getOutages')
        .mockImplementation(() => Promise.resolve(mocked_outages));

      const result = await serviceCaller.setSiteOutage(siteId, []);

      expect(result.statusText).toBe('Bad Request');
      expect(result.status).toBe(400);
      expect(result.code).toEqual('ERR_BAD_REQUEST');
    });
  });
});
