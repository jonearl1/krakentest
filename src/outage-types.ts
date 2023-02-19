export interface Outage {
  id: string;
  begin: string;
  end: string;
  name?: string;
}

export interface Device {
  id: string;
  name: string;
}

export interface SiteInfo {
  id: string;
  name: string;
  devices: Device[];
}
