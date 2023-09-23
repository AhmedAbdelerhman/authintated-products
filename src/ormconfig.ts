import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();
console.log('@@@@@@@@@@@@@@@{__dirname}',__dirname);
export let ormOptions: any = {
  type: 'sqlite',
  database: "product",
  entities: [`${__dirname}/**/*.entity{.js,.ts}`],
  subscriber: [`${__dirname}/**/subscriber/*.subscriber{.js,.ts}`],
  options: { trustServerCertificate: true },
  // migrations: [`${__dirname}/database/migrations/*{.js,.ts}`],
  synchronize: true,
};
const source = new DataSource(ormOptions);
export default source;
