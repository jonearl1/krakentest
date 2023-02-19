import axios from 'axios';

interface Outage {
  id: string;
  begin: string;
  end: string;
  name?: string;
}

interface Device {
  id: string;
  name: string;
}

interface SiteInfo {
  id: string;
  name: string;
  devices: Device[];
}

class OutageService {
  krakenApi = 'https://api.krakenflex.systems/interview-tests-mock-api/v1';

  apiKey = process.env.KRAKEN_API_KEY;

  startDate2022 = '2022-01-01T00:00:00.000Z';

  async getOutagesFromSite(siteId: string): Promise<Outage[]> {
    const outages = await this.getOutagesAfter2022();
    const siteInfo = await this.getSiteInfo(siteId);
    const siteOutages: Outage[] = [];
    outages.forEach((outage: Outage) => {
      siteInfo.devices.forEach((device: Device) => {
        if (device.id === outage.id) {
          siteOutages.push(outage);
        }
      });
    });
    return siteOutages;
  }

  async getOutages(): Promise<Outage[]> {
    const response = await axios.get(`${this.krakenApi}/outages`, this.getApiKeyHeaders());
    return response.data;
  }

  async getOutagesAfter2022() {
    const outages = await this.getOutages();
    const filteredOutages = outages.filter((outage: Outage) => outage.begin >= this.startDate2022);
    return filteredOutages;
  }

  async getSiteInfo(siteId: string): Promise<SiteInfo> {
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
