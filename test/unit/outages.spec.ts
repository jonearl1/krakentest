import axios from 'axios';
import mockedOutages from './outages-mock.json';
import mockedKingfisherSiteInfo from './kingfisher-mock.json';
import mockedNorwichPearTreeSiteInfo from './norwich-pear-tree-mock.json';
import expectedOutages from './expected-all-outages.json';
import expectedOutages2022 from './expected-outages-2022.json';
import OutageService from '../../src/outage-service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const outageService = new OutageService();

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
    const krakenApi = 'https://api.krakenflex.systems/interview-tests-mock-api/v1/site-info';
    it('should get info from site kingfisher ', async () => {
      mockedAxios.get.mockResolvedValue({ status: 200, data: mockedKingfisherSiteInfo });
      const result = await outageService.getSiteInfo('kingfisher');
      expect(axios.get).toHaveBeenCalledWith(`${krakenApi}/kingfisher`, expect.anything());
      expect(result).toEqual(mockedKingfisherSiteInfo);
    });
    it('should get info from site norwich pear tree ', async () => {
      mockedAxios.get.mockResolvedValue({ status: 200, data: mockedNorwichPearTreeSiteInfo });
      const result = await outageService.getSiteInfo('norwich-pear-tree');
      expect(axios.get).toHaveBeenCalledWith(`${krakenApi}/norwich-pear-tree`, expect.anything());
      expect(result).toEqual(mockedNorwichPearTreeSiteInfo);
    });
  });
});
