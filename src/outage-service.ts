import axios from 'axios';

interface Outage {
  id: string;
  begin: string;
  end: string;
}

class OutageService {
  krakenApi = 'https://api.krakenflex.systems/interview-tests-mock-api/v1/outages';
  apiKey = process.env.KRAKEN_API_KEY;

  async getOutages(): Promise<Outage[]> {
    const response = await axios.get(this.krakenApi, {
      headers: {
        accept: 'application/json',
        'x-api-key': this.apiKey,
      },
    });
    return response.data;
  }

  async getOutagesAfter2022() {
    const outages = await this.getOutages();
    const filteredOutages = outages.filter((outage: Outage) => {
      return outage.begin >= '2022-01-01T00:00:00.000Z';
    });
    return filteredOutages;
  }

  async getSiteInfo() {
    const response = await axios.get(
      'https://api.krakenflex.systems/interview-tests-mock-api/v1/site-info/kingfisher',
      {
        headers: {
          accept: 'application/json',
          'x-api-key': this.apiKey,
        },
      }
    );
    return response.data;
  }
}

export default OutageService;
