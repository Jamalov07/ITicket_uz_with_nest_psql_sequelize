import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { District } from './district.model';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District)
    private districtRepo: typeof District,
  ) {}
  async create(createdistrictDto: CreateDistrictDto) {
    const candidate = await this.districtRepo.findOne({
      where: { name: createdistrictDto.name },
    });
    if (candidate) {
      throw new BadRequestException('this name already axists in database');
    }
    const newdistrict = await this.districtRepo.create(createdistrictDto);
    return newdistrict;
  }

  async findAll() {
    const districts = await this.districtRepo.findAll();
    if (!districts) {
      throw new BadRequestException('districts not found');
    }
    return districts;
  }

  async findOne(id: number) {
    const district = await this.districtRepo.findOne({
      where: { id: id },
    });
    if (!district) {
      throw new BadRequestException('district not found');
    }
    return district;
  }

  async update(id: number, updatedistrictDto: UpdateDistrictDto) {
    const district = await this.districtRepo.findOne({
      where: { id: id },
    });
    if (!district) {
      throw new BadRequestException('district not found');
    }
    if (updatedistrictDto.name) {
      const candidate = await this.districtRepo.findOne({
        where: { name: updatedistrictDto.name },
      });
      if (candidate && candidate.id != id) {
        throw new BadRequestException('This name already exists');
      }
    }
    const updateddistrict = await (
      await this.districtRepo.update(updatedistrictDto, {
        where: { id: id },
        returning: true,
      })
    )[1][0];
    return updateddistrict;
  }

  async remove(id: number) {
    const district = await this.districtRepo.findOne({
      where: { id: id },
    });
    if (!district) {
      throw new BadRequestException('district not found');
    }
    await this.districtRepo.destroy({ where: { id: id } });
    return { message: 'district deleted', district };
  }
}
