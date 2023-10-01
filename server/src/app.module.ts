import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfiguration } from '../db/database-configuration';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfiguration),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
