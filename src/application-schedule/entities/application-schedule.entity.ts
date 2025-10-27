import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ApplicationStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

@Schema({ timestamps: true })
export class ApplicationSchedule extends Document {
  @Prop({ required: true })
  propertiId: string;

  @Prop({ required: true })
  chemicalId: string;

  @Prop({ type: Number, required: false })
  applicationRate: number;

  @Prop({ type: Number, required: false })
  totalVolume: number;

  @Prop({ type: Date, required: true })
  startDateTime: Date;

  @Prop({ type: Date, required: true })
  endDateTime: Date;

  @Prop({ enum: ApplicationStatus, default: ApplicationStatus.SCHEDULED })
  status: ApplicationStatus;

  @Prop({ type: Number, required: true })
  latitude: number;

  @Prop({ type: Number, required: true })
  longitude: number;
}

export const ApplicationScheduleSchema = SchemaFactory.createForClass(ApplicationSchedule);
