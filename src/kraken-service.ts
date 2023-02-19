import axios from 'axios';
import { Outage, SiteInfo } from './outage-types';

class KrakenService {
  krakenApi = 'https://api.krakenflex.systems/interview-tests-mock-api/v1';

  apiKey = process.env.KRAKEN_API_KEY;

  async getOutages(): Promise<Outage[]> {
    const response = await axios.get(`${this.krakenApi}/outages`, this.getApiKeyHeaders());
    return response.data;
  }

  async sendOutages(siteId: string, outages: Outage[]): Promise<void> {
    await axios.post(`${this.krakenApi}/site-outages/${siteId}`, outages, this.getApiKeyHeaders());
  }

  async getSiteInfo(siteId: string): Promise<SiteInfo> {
    const response = await axios.get(
      `${this.krakenApi}/site-info/${siteId}`,
      this.getApiKeyHeaders()
    );
    return response.data;
  }

  private getApiKeyHeaders() {
    return {
      headers: {
        accept: 'application/json',
        'x-api-key': this.apiKey,
      },
    };
  }
}
export default KrakenService;
