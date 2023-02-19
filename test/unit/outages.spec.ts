import axios from 'axios';
import mockedOutages from './outages-mock.json';
import mockedKingfisherSiteInfo from './kingfisher-mock.json';
import mockedNorwichPearTreeSiteInfo from './norwich-pear-tree-mock.json';
import expectedOutages from './expected-all-outages.json';
import expectedOutages2022 from './expected-outages-2022.json';
import expectedOutagesKingfisher from './expected-outages-kingfisher.json';
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
      const outagesEndpoint = 'https://api.krakenflex.systems/interview-tests-mock-api/v1/outages';
      const result = await outageService.getOutages();
      expect(axios.get).toHaveBeenCalledWith(outagesEndpoint, expect.anything());
      expect(result).toEqual(expectedOutages);
    });
  });
  describe('Get Outages Filtered', () => {
    it('should only get outages that begin on or after 1st Jan 2022', async () => {
      const result = await outageService.getOutagesAfter2022();
      expect(result).toEqual(expectedOutages2022);
    });
  });
  describe('Get Site Info', () => {
    const siteInfoEndpoint = 'https://api.krakenflex.systems/interview-tests-mock-api/v1/site-info';
    it('should get info from site kingfisher ', async () => {
      mockedAxios.get.mockResolvedValue({ status: 200, data: mockedKingfisherSiteInfo });
      const result = await outageService.getSiteInfo('kingfisher');
      expect(axios.get).toHaveBeenCalledWith(`${siteInfoEndpoint}/kingfisher`, expect.anything());
      expect(result).toEqual(mockedKingfisherSiteInfo);
    });
    it('should get info from site norwich pear tree ', async () => {
      mockedAxios.get.mockResolvedValue({ status: 200, data: mockedNorwichPearTreeSiteInfo });
      const result = await outageService.getSiteInfo('norwich-pear-tree');
      expect(axios.get).toHaveBeenCalledWith(`${siteInfoEndpoint}/norwich-pear-tree`, expect.anything());
      expect(result).toEqual(mockedNorwichPearTreeSiteInfo);
    });
  });

  describe('Get Outages From Site', () => {
    const outagesEndpoint = 'https://api.krakenflex.systems/interview-tests-mock-api/v1/outages';
    const siteInfoEndpoint = 'https://api.krakenflex.systems/interview-tests-mock-api/v1/site-info';
    it('should get info from site kingfisher ', async () => {
      mockedAxios.get.mockResolvedValueOnce({ status: 200, data: mockedOutages });
      mockedAxios.get.mockResolvedValueOnce({ status: 200, data: mockedKingfisherSiteInfo });
      const result = await outageService.getOutagesFromSite('kingfisher');
      expect(axios.get).toHaveBeenCalledWith(outagesEndpoint, expect.anything());
      expect(axios.get).toHaveBeenCalledWith(`${siteInfoEndpoint}/kingfisher`, expect.anything());
      expect(result).toEqual(expectedOutagesKingfisher);
    });
  });
});
