import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Property {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ required: true })
  farmerId: string;

  @Prop({ type: String, required: false })
  ownerName: string;

  @Prop({ type: String, required: false })
  ownerCpfCnpj: string;

  @Prop({ type: String, required: false })
  city: string;

  @Prop({ type: String, required: false })
  fullAddress: string;

  @Prop({ type: String, required: false })
  state: string;

  @Prop({ type: Number, required: true })
  latitude: number;

  @Prop({ type: Number, required: true })
  longitude: number;
}

export const PropertySchema = SchemaFactory.createForClass(Property);

PropertySchema.virtual('id').get(function () {
  return this._id.toString();
});

export type PropertyDocument = HydratedDocument<Property>;
