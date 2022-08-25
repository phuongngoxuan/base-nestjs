import { EventInfo } from './event-info.dto';
interface Result {
  '0': string;
  '1': string;
  '2': string;
  user: string;
  pid: string;
  amount: string;
}
export class EventDeposit extends EventInfo {
  returnValues: Result;
}
