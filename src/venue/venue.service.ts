import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { Venue } from './venue.model';

@Injectable()
export class VenueService {
  
  constructor(
    @InjectModel(Venue)
    private venueRepo: typeof Venue,
  ) {}

  async create(createVenueDto: CreateVenueDto) {
    const candidate = await this.venueRepo.findOne({
      where: { ...createVenueDto },
    });
    if (candidate) {
      throw new BadRequestException('this datas already axists in database');
    }
    const newVenue = await this.venueRepo.create(createVenueDto);
    return newVenue;
  }

  async findAll() {
    const venues = await this.venueRepo.findAll();
    if (!venues) {
      throw new BadRequestException('venues not found');
    }
    return venues;
  }

  async findOne(id: number) {
    const venue = await this.venueRepo.findOne({
      where: { id: id },
    });
    if (!venue) {
      throw new BadRequestException('venue not found');
    }
    return venue;
  }

  async update(id: number, updateVenueDto: UpdateVenueDto) {
    const venue = await this.venueRepo.findOne({
      where: { id: id },
    });
    if (!venue) {
      throw new BadRequestException('Venue not found');
    }

    const candidate = await this.venueRepo.findOne({
      where: { ...updateVenueDto },
    });
    if (candidate && candidate.id != id) {
      throw new BadRequestException('This data already exists');
    }

    const updatedVenue = await (
      await this.venueRepo.update(updateVenueDto, {
        where: { id: id },
        returning: true,
      })
    )[1][0];
    return updatedVenue;
  }
  async remove(id: number) {
    const Venue = await this.venueRepo.findOne({
      where: { id: id },
    });
    if (!Venue) {
      throw new BadRequestException('Venue not found');
    }
    await this.venueRepo.destroy({ where: { id: id } });

    return { message: 'Venue deleted', Venue };
  }

}
