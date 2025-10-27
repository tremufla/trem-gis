import { Controller, Get, Body } from '@nestjs/common';
import { ApplicationScheduleService } from './application-schedule.service';
import { CurrentLocationDto } from './dto/current-location.dto';

@Controller('application-schedule')
export class ApplicationScheduleController {
  constructor(
    private readonly applicationScheduleService: ApplicationScheduleService,
  ) {}

  @Get()
  mapView(@Body() currentLocationDto: CurrentLocationDto) {
    return this.applicationScheduleService.mapView(
      currentLocationDto,
    );
  }
}
