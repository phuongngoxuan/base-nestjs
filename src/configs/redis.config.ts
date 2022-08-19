import { getConfig } from 'src/configs/index';

export const redisConfig = {
  host: getConfig().get<string>('redis.host') || 'http://127.0.0.1',
  port: getConfig().get<number>('redis.port') || 6380,
};
