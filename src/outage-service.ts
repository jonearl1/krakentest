import axios from 'axios';

interface Outage {
  id: string;
  begin: string;
  end: string;
}

class OutageService {
  krakenApi = 'https://api.krakenflex.systems/interview-tests-mock-api/v1';

  apiKey = process.env.KRAKEN_API_KEY;

  startDate2022 = '2022-01-01T00:00:00.000Z';

  async getOutages(): Promise<Outage[]> {
    const response = await axios.get(`${this.krakenApi}/outages`, this.getApiKeyHeaders());
    return response.data;
  }

  async getOutagesAfter2022() {
    const outages = await this.getOutages();
    const filteredOutages = outages.filter((outage: Outage) => outage.begin >= this.startDate2022);
    return filteredOutages;
  }

  async getSiteInfo(siteId: string) {
    const response = await axios.get(`${this.krakenApi}/site-info/${siteId}`, this.getApiKeyHeaders());
    return response.data;
  }

  getApiKeyHeaders() {
    return {
      headers: {
        accept: 'application/json',
        'x-api-key': this.apiKey,
      },
    };
  }
}

export default OutageService;
