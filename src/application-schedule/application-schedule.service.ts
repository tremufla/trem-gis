import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ApplicationSchedule,
  ApplicationStatus,
} from './entities/application-schedule.entity';
import { Model } from 'mongoose';
import { CurrentLocationDto } from './dto/current-location.dto';
import { ApplicationScheduleMapPointDto } from './dto/application-schedule-map-point.dto';

@Injectable()
export class ApplicationScheduleService {
  private readonly DEG_TO_RAD = Math.PI / 180;

  constructor(
    @InjectModel(ApplicationSchedule.name)
    private appScheduleModel: Model<ApplicationSchedule>,
  ) {}

  async mapView(currentLocationDto: CurrentLocationDto) {
    const { latitude, longitude } = currentLocationDto;

    // const applicationScheduleList = [await this.appScheduleModel
    //   .find({
    //     status: { $ne: ApplicationStatus.COMPLETED },
    //     location: {
    //       $nearSphere: {
    //         $geometry: {
    //           type: 'Point',
    //           coordinates: [longitude, latitude],
    //         },
    //         $maxDistance: 10 * 1000, // raio de 10 km
    //       },
    //     },
    //   })
    //   .exec();

    const applicationScheduleList: ApplicationSchedule[] = [];

    const danger: ApplicationScheduleMapPointDto[] = [
      { publicId: 'test', latitude: -21.222821377953085, longitude: -44.98476010185646 },
      { publicId: 'test2', latitude: -21.23722240735684, longitude: -44.98149689258798 },
      { publicId: 'test3', latitude: -21.236582391466943, longitude: -45.001591391767604 },
    ];

    const warning: ApplicationScheduleMapPointDto[] = [
      { publicId: 'test4', latitude: -21.206978621987176, longitude: -44.98802331112494 },
      { publicId: 'test5', latitude: -21.22602172822201, longitude: -45.022544630228424 },
      { publicId: 'test6', latitude: -21.25306191512753, longitude: -45.005671830261385 },
    ];
    
    const safe: ApplicationScheduleMapPointDto[] = [
      { publicId: 'test7', latitude: -21.196735935596312, longitude: -44.93748793133561 },
      { publicId: 'test8', latitude: -21.22970204519957, longitude: -45.072009223534415 },
      { publicId: 'test9', latitude: -21.275298349774065, longitude: -45.00722006886672 },
    ];

    for (const applicationSchedule of applicationScheduleList) {
      const point: ApplicationScheduleMapPointDto = {
        publicId: applicationSchedule.id,
        latitude: applicationSchedule.latitude,
        longitude: applicationSchedule.longitude,
      };

      const distance = this.calculateDistance(
        latitude,
        longitude,
        applicationSchedule.latitude,
        applicationSchedule.longitude,
      );

      if (distance <= 7) danger.push(point);

      else if (distance <= 10) warning.push(point);
      
      else safe.push(point);
    }

    return {
      danger,
      warning,
      safe,
    }
  }

  private calculateDistance(
    startLatitude: number,
    startLongitude: number,
    endLatitude: number,
    endLongitude: number,
  ): number {
    const earthRadiusKm = 6371;

    const deltaLatitude = this.degTorad(endLatitude - startLatitude);
    const deltaLongitude = this.degTorad(endLongitude - startLongitude);

    const haversineFormula =
      Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
      Math.cos(this.degTorad(startLatitude)) *
        Math.cos(this.degTorad(endLatitude)) *
        Math.sin(deltaLongitude / 2) *
        Math.sin(deltaLongitude / 2);

    const centralAngle =
      2 *
      Math.atan2(Math.sqrt(haversineFormula), Math.sqrt(1 - haversineFormula));

    return earthRadiusKm * centralAngle;
  }

  private degTorad(deg: number): number {
    return deg * this.DEG_TO_RAD;
  }
}
