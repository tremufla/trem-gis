import { ApplicationScheduleMapPointDto } from './application-schedule-map-point.dto';

export class ApplicationScheduleByRiskDto {
  danger: ApplicationScheduleMapPointDto[];
  warning: ApplicationScheduleMapPointDto[];
  safe: ApplicationScheduleMapPointDto[];
}
