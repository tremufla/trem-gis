import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ApplicationScheduleService } from './application-schedule.service';
import { ApplicationSchedule } from './entities/application-schedule.entity';

describe('ApplicationScheduleService', () => {
  let service: ApplicationScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationScheduleService,
        {
          provide: getModelToken(ApplicationSchedule.name),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ApplicationScheduleService>(ApplicationScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
