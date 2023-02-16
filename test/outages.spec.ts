import getOutages from '../src/outage-service';

describe('Outage Service', () => {
  it('should return a list of outages', () => {
    expect(getOutages().length).toBeGreaterThan(0);
  });
});
