import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { FindAllPropertyLeanResponseDto } from './dto/find-all-property-lean-response.dto';
import { FindAllPropertyResponseDto } from './dto/find-all-property-response.dto';
import { PropertyResponseDto } from './dto/property-response.dto';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  async create(
    @Body() createPropertyDto: CreatePropertyDto,
  ): Promise<PropertyResponseDto> {
    const farmerId = '03c92296-7de5-4724-b461-6b74c92027fb';

    if (!farmerId) {
      throw new BadRequestException('farmerId is required');
    }

    return this.propertyService.create(createPropertyDto, farmerId);
  }

  @Get()
  async findAll(): Promise<FindAllPropertyResponseDto[]> {
    const farmerId = '03c92296-7de5-4724-b461-6b74c92027fb';

    if (!farmerId) {
      throw new BadRequestException('farmerId is required');
    }

    return this.propertyService.findAll(farmerId);
  }

  @Get('lean')
  async findAllLean(): Promise<FindAllPropertyLeanResponseDto[]> {
    const farmerId = '03c92296-7de5-4724-b461-6b74c92027fb';

    if (!farmerId) {
      throw new BadRequestException('farmerId is required');
    }

    return this.propertyService.findAllLean(farmerId);
  }
}
