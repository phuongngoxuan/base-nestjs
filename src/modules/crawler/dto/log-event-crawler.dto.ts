import { EventInfo } from './event-info.dto';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export class ReturnValues {}

export class LogEventDto extends EventInfo {
  returnValues: ReturnValues;
}
