import axios from 'axios';
import getOutages from '../../src/outage-service';
import expectedOutages from '../test-data/expected-outages.json';
import mockedOutages from '../test-data/outages-mock.json';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Outage Service', () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ status: 200, data: mockedOutages });
  });

  it('should return a list of outages', async () => {
    const result = await getOutages();
    expect(result.length).toBeGreaterThan(0);
  });

  it('get id, begin, end of outages', async () => {
    const result = await getOutages();
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('begin');
    expect(result[0]).toHaveProperty('end');
  });

  it('should get expected outages from Kraken Api/ outages endpoint', async () => {
    const krakenApi = 'https://api.krakenflex.systems/interview-tests-mock-api/v1/outages';
    const result = await getOutages();
    expect(axios.get).toHaveBeenCalledWith(krakenApi, expect.anything());
    expect(result).toEqual(expectedOutages);
  });
});
