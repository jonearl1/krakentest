import axios, { AxiosResponse, AxiosError } from 'axios';
import mockedOutages from './outages-mock.json';
import mockedKingfisherSiteInfo from './kingfisher-mock.json';
import expectedOutagesKingfisher from './expected-outages-kingfisher.json';
import mockedNorwichSiteInfo from './norwich-pear-tree-mock.json';
import expectedOutagesNorwich from './expected-outages-norwich.json';
import OutageService from '../../src/outage-service';
import KrakenError from '../../src/error/kraken-forbidden-error';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const outageService = new OutageService();

const apiKeyHeader = {
  headers: { accept: 'application/json', 'x-api-key': process.env.KRAKEN_API_KEY },
};
const outagesEndpoint = 'https://api.krakenflex.systems/interview-tests-mock-api/v1/outages';
const siteInfoEndpoint = 'https://api.krakenflex.systems/interview-tests-mock-api/v1/site-info';
const siteOutagesEndpoint =
  'https://api.krakenflex.systems/interview-tests-mock-api/v1/site-outages';

describe('Outage Service', () => {
  describe('Site device outages', () => {
    beforeEach(() => {
      mockedAxios.get.mockResolvedValueOnce({ status: 200, data: mockedOutages });
      mockedAxios.post.mockResolvedValueOnce({ status: 200, data: {} });
    });
    it('should send kingfisher site outages with device ids', async () => {
      mockedAxios.get.mockResolvedValueOnce({ status: 200, data: mockedKingfisherSiteInfo });

      await outageService.getOutagesFromSite('kingfisher');

      expect(axios.get).toHaveBeenCalledWith(outagesEndpoint, apiKeyHeader);
      expect(axios.get).toHaveBeenCalledWith(`${siteInfoEndpoint}/kingfisher`, apiKeyHeader);
      expect(axios.post).toHaveBeenCalledWith(
        `${siteOutagesEndpoint}/kingfisher`,
        expectedOutagesKingfisher,
        apiKeyHeader
      );
    });
    it('should send norwhich site outages with device ids', async () => {
      mockedAxios.get.mockResolvedValueOnce({ status: 200, data: mockedNorwichSiteInfo });

      await outageService.getOutagesFromSite('norwich');

      expect(axios.get).toHaveBeenCalledWith(outagesEndpoint, apiKeyHeader);
      expect(axios.get).toHaveBeenCalledWith(`${siteInfoEndpoint}/norwich`, apiKeyHeader);
      expect(axios.post).toHaveBeenCalledWith(
        `${siteOutagesEndpoint}/norwich`,
        expectedOutagesNorwich,
        apiKeyHeader
      );
    });
  });

  it('throw handle 403 error and add addition information', async () => {
    mockedAxios.isAxiosError.mockReturnValue(true);
    mockedAxios.get.mockImplementationOnce(() => {
      const response: AxiosResponse = {
        data: { message: 'Forbidden' },
        status: 403,
      } as AxiosResponse;
      const axiosError = {
        message: 'Request failed with status code 403',
        config: {},
        request: {},
        response,
      } as AxiosError<any>;
      throw axiosError;
    });

    let err = null;
    try {
      await outageService.getOutagesFromSite('norwich');
    } catch (error) {
      err = error;
    }

    expect(err).toBeTruthy();
    const krakenError = err as KrakenError;
    expect(krakenError.message).toEqual(
      'Request failed with status code 403, please check your API key'
    );
  });
});
