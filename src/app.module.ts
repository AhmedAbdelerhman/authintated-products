import { ormOptions } from './ormconfig';
import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Connection } from 'typeorm';
import { AuthModule } from './users/user.module';
import { JsonService } from './redFromJSon.service';
@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ormOptions,
    }),

    AuthModule,
  ],
  providers: [JsonService],
  exports:[JsonService]
})
export class AppModule {
 

}