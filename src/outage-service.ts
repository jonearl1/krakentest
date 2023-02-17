import axios from 'axios';

const krakenApi = 'https://api.krakenflex.systems/interview-tests-mock-api/v1/outages';
const apiKey = process.env.KRAKEN_API_KEY;

interface Outage {
  id: string;
  begin: string;
  end: string;
}

async function getOutages(): Promise<Outage[]> {
  const response = await axios.get(krakenApi, {
    headers: {
      accept: 'application/json',
      'x-api-key': apiKey,
    },
  });
  return response.data;
}
export default getOutages;
