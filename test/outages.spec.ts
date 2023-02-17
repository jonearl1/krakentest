import axios from 'axios';
import getOutages from '../src/outage-service';
import expectedOutages from './expected/outages.json';

jest.mock('axios');
const mockedAxios = axios as jest.MockedFunction<typeof axios>;
mockedAxios.mockResolvedValue({ status: 200, data: 'mockResponse' });

describe('Outage Service', () => {
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

  it('should call kraken api /outages endpoint', () => {
    const krakenApi = 'https://api.krakenflex.systems/interview-tests-mock-api/v1/outages';
    getOutages();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(krakenApi);
  });
});
