import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationScheduleController } from './application-schedule.controller';
import { ApplicationScheduleService } from './application-schedule.service';

describe('ApplicationScheduleController', () => {
  let controller: ApplicationScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationScheduleController],
      providers: [ApplicationScheduleService],
    }).compile();

    controller = module.get<ApplicationScheduleController>(ApplicationScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
