import axios from 'axios';
import getOutages from '../src/outage-service';
import expectedOutages from './expected/outages.json';

describe('Outage Service', () => {
  const krakenApi = 'https://api.krakenflex.systems/interview-tests-mock-api/v1';

  it('should return a list of outages', () => {
    expect(getOutages().length).toBeGreaterThan(0);
  });

  it('get id, begin, end of outages', () => {
    const result = getOutages();
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('begin');
    expect(result[0]).toHaveProperty('end');
  });

  it('should get expected outages', () => {
    const result = getOutages();
    expect(result).toEqual(expectedOutages);
  });

  it('should call kraken api', () => {
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(krakenApi);
  });

  it('should call kraken api', () => {
    const result = getOutages();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(krakenApi);
    expect(result).toEqual(expectedOutages);
  });
});
