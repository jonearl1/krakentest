import getOutages from '../../src/outage-service';
import OutageService from '../../src/outage-service';
let outageService = new OutageService();

describe('Outage Service', () => {
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
