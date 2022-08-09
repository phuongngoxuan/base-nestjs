import { ConvertTimeToStatusDto } from '../dto/convert-time-to-status.dto';
import { statusConstant } from '../constant/query-pool.constant';
export class PoolUtils {
  public convertTimeToStatus({
    openTime,
    closeTime,
  }: ConvertTimeToStatusDto): number {
    const now = Math.floor(new Date().getTime() / 1000);
    if (now > openTime && now > closeTime) {
      return statusConstant.STATUS_ENDED;
    }
    if (openTime <= now && now <= closeTime) {
      return statusConstant.STATUS_ACTIVE;
    }
    if (now < openTime && now < closeTime) {
      return statusConstant.STATUS_INACTIVE;
    }
  }
}
