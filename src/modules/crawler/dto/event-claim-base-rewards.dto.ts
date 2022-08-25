import { EventInfo } from './event-info.dto';

interface Result {
  '0': string;
  '1': string;
  '2': string;
  user: string;
  pid: string;
  amount: string;
}
export class EventClaimBaseRewards extends EventInfo {
  returnValues: Result;
}
