import { ormOptions } from './ormconfig';
import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Connection } from 'typeorm';
import { AuthModule } from './users/user.module';
import { JsonService } from './redFromJSon.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PaymentsModule } from './payments/payments.module';
@Global()
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public',),
      
      exclude: ['/api/(.*)'],
    }),
    TypeOrmModule.forRoot({
      ...ormOptions,
    }),

    AuthModule,

    PaymentsModule,
  ],
  providers: [JsonService],
  exports:[JsonService]
})
export class AppModule {
 

}