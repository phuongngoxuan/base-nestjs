import { getConfig } from 'src/configs/index';

export interface DatabaseConfig {
  type: 'mysql';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: string[];
  logging: boolean;
  extra: {
    connectionLimit: 100;
  };
}

export const masterConfig = {
  ...getConfig().get<DatabaseConfig>('master'),
  autoLoadEntities: true,
  name: 'master',
};

export const reportConfig = {
  ...getConfig().get<DatabaseConfig>('report'),
  autoLoadEntities: true,
  name: 'report',
};
