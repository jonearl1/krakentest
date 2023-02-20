import { AxiosError } from 'axios';

class KrakenForbiddenError extends Error {
  code: any;

  status: any;

  dataMessage: any;

  constructor(error: AxiosError) {
    super(`${error.message}, please check your API key`);
  }
}
export default KrakenForbiddenError;
