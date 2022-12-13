import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './region.model';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region)
    private regionRepo: typeof Region,
  ) {}
  async create(createregionDto: CreateRegionDto) {
    const candidate = await this.regionRepo.findOne({
      where: { name: createregionDto.name },
    });
    if (candidate) {
      throw new BadRequestException('this name already axists in database');
    }
    const newregion = await this.regionRepo.create(createregionDto);
    return newregion;
  }

  async findAll() {
    const regions = await this.regionRepo.findAll({ include: { all: true } });
    if (!regions) {
      throw new BadRequestException('regions not found');
    }
    return regions;
  }

  async findOne(id: number) {
    const region = await this.regionRepo.findOne({
      where: { id: id },
      include: { all: true },
    });
    if (!region) {
      throw new BadRequestException('region not found');
    }
    return region;
  }

  async update(id: number, updateregionDto: UpdateRegionDto) {
    const region = await this.regionRepo.findOne({
      where: { id: id },
    });
    if (!region) {
      throw new BadRequestException('region not found');
    }
    if (updateregionDto.name) {
      const candidate = await this.regionRepo.findOne({
        where: { name: updateregionDto.name },
      });
      if (candidate && candidate.id != id) {
        throw new BadRequestException('This name already exists');
      }
    }
    const updatedregion = await (
      await this.regionRepo.update(updateregionDto, {
        where: { id: id },
        returning: true,
      })
    )[1][0];
    return updatedregion;
  }

  async remove(id: number) {
    const region = await this.regionRepo.findOne({
      where: { id: id },
    });
    if (!region) {
      throw new BadRequestException('region not found');
    }
    await this.regionRepo.destroy({ where: { id: id } });
    return { message: 'region deleted', region };
  }
}
