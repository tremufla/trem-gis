import { Module } from '@nestjs/common';
import { ApplicationScheduleService } from './application-schedule.service';
import { ApplicationScheduleController } from './application-schedule.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationSchedule, ApplicationScheduleSchema } from './entities/application-schedule.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ApplicationSchedule.name, schema: ApplicationScheduleSchema },
    ]),
  ],
  controllers: [ApplicationScheduleController],
  providers: [ApplicationScheduleService],
})
export class ApplicationScheduleModule {}