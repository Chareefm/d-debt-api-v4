import {
  ISmsClientSend,
  SmsClientConfig,
} from '@share/types/SmsClient.interface';
import axios from 'axios';
import parser from 'xml2json';

export class SmsClient {
  public constructor(public config: SmsClientConfig) {}
  async send({ from, message, to }: ISmsClientSend) {
    const method = 'send';
    const response = await axios.get(
      `${this.config.apiUrl}?method=${method}&username=${this.config.username}&password=${this.config.password}&from=${from}&to=${to}&message=${message}`,
    );
    return parser.toJson(response.data);
  }

  async getCredit() {
    const method = 'credit';
    const response = await axios.get(
      `${this.config.apiUrl}?method=${method}&username=${this.config.username}&password=${this.config.password}`,
    );
    return parser.toJson(response.data);
  }
}
