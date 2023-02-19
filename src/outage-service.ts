import KrakenService from './kraken-service';
import { Device, Outage } from './outage-types';

class OutageService {
  startDate2022 = '2022-01-01T00:00:00.000Z';

  krakenService: KrakenService;

  constructor() {
    this.krakenService = new KrakenService();
  }

  async getOutagesFromSite(siteId: string): Promise<void> {
    const outages = await this.filterOutagesByStartDate(await this.krakenService.getOutages());

    const siteInfo = await this.krakenService.getSiteInfo(siteId);
    const filteredOutages = outages.filter((outage: Outage) =>
      siteInfo.devices.find((device: Device) => device.id === outage.id)
    );

    const deviceOutages = filteredOutages.map((outage) => {
      const matchingDevice = siteInfo.devices.find((device: Device) => device.id === outage.id);
      return { ...outage, ...matchingDevice };
    });

    await this.krakenService.sendOutages(siteId, deviceOutages);
  }

  private async filterOutagesByStartDate(outages: Outage[]) {
    const filteredOutages = outages.filter((outage: Outage) => outage.begin >= this.startDate2022);
    return filteredOutages;
  }
}

export default OutageService;
