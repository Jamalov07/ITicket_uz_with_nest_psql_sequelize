import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateVenuePhotoDto } from './dto/create-venue_photo.dto';
import { UpdateVenuePhotoDto } from './dto/update-venue_photo.dto';
import { Venue_photo } from './venue_photo.model';

@Injectable()
export class VenuePhotoService {
  constructor(
    @InjectModel(Venue_photo)
    private venuePhotoRepo: typeof Venue_photo,
  ) {}

  async create(createVenue_photoDto: CreateVenuePhotoDto) {
    const candidate = await this.venuePhotoRepo.findOne({
      where: { ...createVenue_photoDto },
    });
    if (candidate) {
      throw new BadRequestException('this datas already axists in database');
    }
    const newVenue_photo = await this.venuePhotoRepo.create(
      createVenue_photoDto,
    );
    return newVenue_photo;
  }

  async findAll() {
    const venue_photos = await this.venuePhotoRepo.findAll();
    if (!venue_photos) {
      throw new BadRequestException('venue_photos not found');
    }
    return venue_photos;
  }

  async findOne(id: number) {
    const venue_photo = await this.venuePhotoRepo.findOne({
      where: { id: id },
    });
    if (!venue_photo) {
      throw new BadRequestException('venue_photo not found');
    }
    return venue_photo;
  }

  async update(id: number, updateVenue_photoDto: UpdateVenuePhotoDto) {
    const venue_photo = await this.venuePhotoRepo.findOne({
      where: { id: id },
    });
    if (!venue_photo) {
      throw new BadRequestException('Venue_photo not found');
    }

    const candidate = await this.venuePhotoRepo.findOne({
      where: { ...updateVenue_photoDto },
    });
    if (candidate && candidate.id != id) {
      throw new BadRequestException('This data already exists');
    }

    const updatedVenue_photo = await (
      await this.venuePhotoRepo.update(updateVenue_photoDto, {
        where: { id: id },
        returning: true,
      })
    )[1][0];
    return updatedVenue_photo;
  }
  async remove(id: number) {
    const Venue_photo = await this.venuePhotoRepo.findOne({
      where: { id: id },
    });
    if (!Venue_photo) {
      throw new BadRequestException('Venue_photo not found');
    }
    await this.venuePhotoRepo.destroy({ where: { id: id } });

    return { message: 'Venue_photo deleted', Venue_photo };
  }
}
