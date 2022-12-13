import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Gender } from './gender.model';

@Injectable()
export class GenderService {
  constructor(
    @InjectModel(Gender)
    private genderRepo: typeof Gender,
  ) {}
  async create(creategenderDto: CreateGenderDto) {
    const candidate = await this.genderRepo.findOne({
      where: { name: creategenderDto.name },
    });
    if (candidate) {
      throw new BadRequestException('this name already axists in database');
    }
    const newgender = await this.genderRepo.create(creategenderDto);
    return newgender;
  }

  async findAll() {
    const genders = await this.genderRepo.findAll({ include: { all: true } });
    if (!genders) {
      throw new BadRequestException('genders not found');
    }
    return genders;
  }

  async findOne(id: number) {
    const gender = await this.genderRepo.findOne({
      where: { id: id },include: { all: true }
    });
    if (!gender) {
      throw new BadRequestException('gender not found');
    }
    return gender;
  }

  async update(id: number, updategenderDto: UpdateGenderDto) {
    const gender = await this.genderRepo.findOne({
      where: { id: id },
    });
    if (!gender) {
      throw new BadRequestException('gender not found');
    }
    if (updategenderDto.name) {
      const candidate = await this.genderRepo.findOne({
        where: { name: updategenderDto.name },
      });
      if (candidate && candidate.id != id) {
        throw new BadRequestException('This name already exists');
      }
    }
    const updatedgender = await (
      await this.genderRepo.update(updategenderDto, {
        where: { id: id },
        returning: true,
      })
    )[1][0];
    return updatedgender;
  }

  async remove(id: number) {
    const gender = await this.genderRepo.findOne({
      where: { id: id },
    });
    if (!gender) {
      throw new BadRequestException('gender not found');
    }
    await this.genderRepo.destroy({ where: { id: id } });
    return { message: 'gender deleted', gender };
  }
}
