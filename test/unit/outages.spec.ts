import axios from 'axios';
import mockedOutages from './outages-mock.json';
import mockedKingfisherSiteInfo from './kingfisher-mock.json';
import expectedOutages from './expected-all-outages.json';
import expectedOutages2022 from './expected-outages-2022.json';
import OutageService from '../../src/outage-service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
let outageService = new OutageService();

describe('Outage Service', () => {
  beforeEach(() => {
    // jest.resetAllMocks();
  });
  describe('Get Outages', () => {
    beforeEach(() => {
      mockedAxios.get.mockResolvedValue({ status: 200, data: mockedOutages });
    });
    it('should get expected outages from Kraken Api /outages endpoint', async () => {
      const krakenApi = 'https://api.krakenflex.systems/interview-tests-mock-api/v1/outages';
      const result = await outageService.getOutages();
      expect(axios.get).toHaveBeenCalledWith(krakenApi, expect.anything());
      expect(result).toEqual(expectedOutages);
    });
    it('should only get outages that begin on or after 1st Jan 2022', async () => {
      const result = await outageService.getOutagesAfter2022();
      expect(result).toEqual(expectedOutages2022);
    });
  });
  describe('Get Site Info', () => {
    beforeEach(() => {
      mockedAxios.get.mockResolvedValue({ status: 200, data: mockedKingfisherSiteInfo });
    });
    it('should get info from site kingfisher ', async () => {
      const krakenApi = 'https://api.krakenflex.systems/interview-tests-mock-api/v1/site-info/kingfisher';
      const result = await outageService.getSiteInfo();
      expect(axios.get).toHaveBeenCalledWith(krakenApi, expect.anything());
      expect(result).toEqual(mockedKingfisherSiteInfo);
    });
  });
});
