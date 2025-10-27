import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationScheduleService } from './application-schedule.service';

describe('ApplicationScheduleService', () => {
  let service: ApplicationScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationScheduleService],
    }).compile();

    service = module.get<ApplicationScheduleService>(ApplicationScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
