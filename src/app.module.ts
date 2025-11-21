import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationScheduleModule } from './application-schedule/application-schedule.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertyModule } from './property/property.module';

const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT, DATABASE_NAME } = process.env;

const uri = `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}?authSource=admin`;

console.log('Connecting to MongoDB with URI:', uri);

@Module({
  imports: [ApplicationScheduleModule, MongooseModule.forRoot(uri), PropertyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
