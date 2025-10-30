import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationScheduleController } from './application-schedule.controller';
import { ApplicationScheduleService } from './application-schedule.service';
import { CurrentLocationDto } from './dto/current-location.dto';

describe('ApplicationScheduleController', () => {
  let controller: ApplicationScheduleController;
  let service: ApplicationScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationScheduleController],
      providers: [
        {
          provide: ApplicationScheduleService,
          useValue: {
            mapView: jest.fn().mockImplementation(() => ({
              danger: [],
              warning: [],
              safe: [],
            })),
          },
        },
      ],
    }).compile();

    controller = module.get<ApplicationScheduleController>(
      ApplicationScheduleController,
    );
    service = module.get<ApplicationScheduleService>(
      ApplicationScheduleService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call mapView and return result', () => {
    const dto: CurrentLocationDto = { latitude: 0, longitude: 0 };

    const result = controller.mapView(dto);

    expect(jest.mocked(service.mapView)).toHaveBeenCalledWith(dto);

    expect(result).toEqual({
      danger: [],
      warning: [],
      safe: [],
    });
  });
});
