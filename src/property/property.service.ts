import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { Model } from 'mongoose';
import { Property, PropertyDocument } from './entities/property.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PropertyResponseDto } from './dto/property-response.dto';
import { FindAllPropertyResponseDto } from './dto/find-all-property-response.dto';
import { FindAllPropertyLeanResponseDto } from './dto/find-all-property-lean-response.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name)
    private propertyModel: Model<PropertyDocument>,
  ) {}

  private toResponseDto(property: PropertyDocument): PropertyResponseDto {
    return {
      id: property._id.toString(),
      name: property.name,
      ownerName: property.ownerName,
      ownerCpfCnpj: property.ownerCpfCnpj,
      city: property.city,
      fullAddress: property.fullAddress,
      state: property.state,
      latitude: property.latitude,
      longitude: property.longitude,
    };
  }

  private toLeanResponseDto(property: PropertyDocument): FindAllPropertyLeanResponseDto {
    return {
      id: property._id.toString(),
      name: property.name,
      latitude: property.latitude,
      longitude: property.longitude,
    };
  }

  async create(createPropertyDto: CreatePropertyDto, farmerId: string): Promise<PropertyResponseDto> {
    const propertyCreated = await this.propertyModel.create({
      ...createPropertyDto,
      farmerId,
    });

    return this.toResponseDto(propertyCreated);
  }

  async findAll(farmerId: string): Promise<FindAllPropertyResponseDto[]> {
    const properties = await this.propertyModel.find({ farmerId }).exec();

    return properties.map((property) => this.toResponseDto(property));
  }

  async findAllLean(farmerId: string): Promise<FindAllPropertyLeanResponseDto[]> {
    const properties: PropertyDocument[] = await this.propertyModel.find({ farmerId }).exec();

    return properties.map((property) => this.toLeanResponseDto(property));
  }
}
