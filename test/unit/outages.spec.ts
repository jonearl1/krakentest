import axios from 'axios';
import mockedOutages from './outages-mock.json';
import mockedKingfisherSiteInfo from './kingfisher-mock.json';
import expectedOutagesKingfisher from './expected-outages-kingfisher.json';
import mockedNorwichSiteInfo from './norwich-pear-tree-mock.json';
import expectedOutagesNorwich from './expected-outages-norwich.json';
import OutageService from '../../src/outage-service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const outageService = new OutageService();

const apiKeyHeader = {
  headers: { accept: 'application/json', 'x-api-key': process.env.KRAKEN_API_KEY },
};

describe('Outage Service', () => {
  describe('Get Outages From Site kingfisher', () => {
    const outagesEndpoint = 'https://api.krakenflex.systems/interview-tests-mock-api/v1/outages';
    const siteInfoEndpoint = 'https://api.krakenflex.systems/interview-tests-mock-api/v1/site-info';
    it('should get outages kingfisher and add the names of the devices', async () => {
      mockedAxios.get.mockResolvedValueOnce({ status: 200, data: mockedOutages });
      mockedAxios.get.mockResolvedValueOnce({ status: 200, data: mockedKingfisherSiteInfo });
      const result = await outageService.getOutagesFromSite('kingfisher');
      expect(axios.get).toHaveBeenCalledWith(outagesEndpoint, apiKeyHeader);
      expect(axios.get).toHaveBeenCalledWith(`${siteInfoEndpoint}/kingfisher`, apiKeyHeader);
      expect(result).toEqual(expectedOutagesKingfisher);
    });
  });

  describe('Get Outages From Site norwich', () => {
    const outagesEndpoint = 'https://api.krakenflex.systems/interview-tests-mock-api/v1/outages';
    const siteInfoEndpoint = 'https://api.krakenflex.systems/interview-tests-mock-api/v1/site-info';
    it('should get outages from norwich and add the names of the devices', async () => {
      mockedAxios.get.mockResolvedValueOnce({ status: 200, data: mockedOutages });
      mockedAxios.get.mockResolvedValueOnce({ status: 200, data: mockedNorwichSiteInfo });
      const result = await outageService.getOutagesFromSite('norwich');
      expect(axios.get).toHaveBeenCalledWith(outagesEndpoint, apiKeyHeader);
      expect(axios.get).toHaveBeenCalledWith(`${siteInfoEndpoint}/norwich`, apiKeyHeader);
      expect(result).toEqual(expectedOutagesNorwich);
    });
  });
});
