import OutageService from '../../src/outage-service';
import expectedSiteInfoNorwich from './expected-site-info-norwich.json';

const outageService = new OutageService();

describe('Outage Service', () => {
  describe('Get Outages', () => {
    it('should retrieve outages from kraken api /outages endpoint', async () => {
      const result = await outageService.getOutages();
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            begin: expect.any(String),
            end: expect.any(String),
          }),
        ])
      );
      expect(result.length).toEqual(108);
    });
  });

  describe('Get Site Info', () => {
    it('should get info from site norwich-pear-tree ', async () => {
      const result = await outageService.getSiteInfo('norwich-pear-tree');
      expect(result).toEqual(expectedSiteInfoNorwich);
    });
  });
});
