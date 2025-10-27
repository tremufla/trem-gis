import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationScheduleModule } from './application-schedule/application-schedule.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ApplicationScheduleModule,
    MongooseModule.forRoot('mongodb://localhost:27017/your-database-name'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}