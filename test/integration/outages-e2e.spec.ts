import OutageService from '../../src/outage-service';

const outageService = new OutageService();

describe('Outage Service', () => {
  describe('Get Outages From Site norwich', () => {
    it('should get outages from norwich and add the names of the devices', async () => {
      await outageService.getOutagesFromSite('norwich-pear-tree');
    });
  });
});
