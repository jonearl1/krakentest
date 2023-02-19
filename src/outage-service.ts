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

  async getOutagesFromSite(siteId: string): Promise<void> {
    const outages = await this.filterOutagesByStartDate(await this.getOutages());

    const siteInfo = await this.getSiteInfo(siteId);
    const filteredOutages = outages.filter((outage: Outage) =>
      siteInfo.devices.find((device) => device.id === outage.id)
    );

    const deviceOutages = filteredOutages.map((outage) => {
      const matchingDevice = siteInfo.devices.find((device) => device.id === outage.id);
      return { ...outage, ...matchingDevice };
    });

    await this.sendOutages(siteId, deviceOutages);
  }

  private async getOutages(): Promise<Outage[]> {
    const response = await axios.get(`${this.krakenApi}/outages`, this.getApiKeyHeaders());
    return response.data;
  }

  private async sendOutages(siteId: string, outages: Outage[]): Promise<void> {
    await axios.post(`${this.krakenApi}/site-outages/${siteId}`, outages, this.getApiKeyHeaders());
  }

  private async filterOutagesByStartDate(outages: Outage[]) {
    const filteredOutages = outages.filter((outage: Outage) => outage.begin >= this.startDate2022);
    return filteredOutages;
  }

  private async getSiteInfo(siteId: string): Promise<SiteInfo> {
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

export default OutageService;
