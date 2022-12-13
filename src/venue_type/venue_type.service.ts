import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateVenueTypeDto } from './dto/create-venue_type.dto';
import { UpdateVenueTypeDto } from './dto/update-venue_type.dto';
import { Venue_type } from './venue_type.model';

@Injectable()
export class VenueTypeService {
  constructor(
    @InjectModel(Venue_type)
    private venueTypeRepo: typeof Venue_type,
  ) {}

  async create(createVenue_typeDto: CreateVenueTypeDto) {
    const candidate = await this.venueTypeRepo.findOne({
      where: { ...createVenue_typeDto },
    });
    if (candidate) {
      throw new BadRequestException('this datas already axists in database');
    }
    const newVenue_type = await this.venueTypeRepo.create(createVenue_typeDto);
    return newVenue_type;
  }

  async findAll() {
    const venue_types = await this.venueTypeRepo.findAll({
      include: { all: true },
    });
    if (!venue_types) {
      throw new BadRequestException('venue_types not found');
    }
    return venue_types;
  }

  async findOne(id: number) {
    const venue_type = await this.venueTypeRepo.findOne({
      where: { id: id },
      include: { all: true },
    });
    if (!venue_type) {
      throw new BadRequestException('venue_type not found');
    }
    return venue_type;
  }

  async update(id: number, updateVenue_typeDto: UpdateVenueTypeDto) {
    const venue_type = await this.venueTypeRepo.findOne({
      where: { id: id },
    });
    if (!venue_type) {
      throw new BadRequestException('Venue_type not found');
    }

    const candidate = await this.venueTypeRepo.findOne({
      where: { ...updateVenue_typeDto },
    });
    if (candidate && candidate.id != id) {
      throw new BadRequestException('This data already exists');
    }

    const updatedVenue_type = await (
      await this.venueTypeRepo.update(updateVenue_typeDto, {
        where: { id: id },
        returning: true,
      })
    )[1][0];
    return updatedVenue_type;
  }
  async remove(id: number) {
    const Venue_type = await this.venueTypeRepo.findOne({
      where: { id: id },
    });
    if (!Venue_type) {
      throw new BadRequestException('Venue_type not found');
    }
    await this.venueTypeRepo.destroy({ where: { id: id } });

    return { message: 'Venue_type deleted', Venue_type };
  }
}
