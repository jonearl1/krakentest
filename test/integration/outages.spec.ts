import getOutages from '../../src/outage-service';

describe('Outage Service', () => {
  it('should retrieve outages from kraken api /outages endpoint', async () => {
    const result = await getOutages();
    expect(result.length).toBeGreaterThan(6);
  });
});
