import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Country } from './country.model';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountryService {
  constructor(@InjectModel(Country) private countryRepo: typeof Country) {}
  async create(createcountryDto: CreateCountryDto) {
    const candidate = await this.countryRepo.findOne({
      where: { name: createcountryDto.name },
    });
    if (candidate) {
      throw new BadRequestException('this name already axists in database');
    }
    const newcountry = await this.countryRepo.create(createcountryDto);
    return newcountry;
  }

  async findAll() {
    const countrys = await this.countryRepo.findAll();
    if (!countrys) {
      throw new BadRequestException('countrys not found');
    }
    return countrys;
  }

  async findOne(id: number) {
    const country = await this.countryRepo.findOne({ where: { id: id } });
    if (!country) {
      throw new BadRequestException('country not found');
    }
    return country;
  }

  async update(id: number, updatecountryDto: UpdateCountryDto) {
    const country = await this.countryRepo.findOne({ where: { id: id } });
    if (!country) {
      throw new BadRequestException('country not found');
    }
    if (updatecountryDto.name) {
      const candidate = await this.countryRepo.findOne({
        where: { name: updatecountryDto.name },
      });
      if (candidate && candidate.id != id) {
        throw new BadRequestException('This name already exists');
      }
    }
    const updatedcountry = await (
      await this.countryRepo.update(updatecountryDto, {
        where: { id: id },
        returning: true,
      })
    )[1][0];
    return updatedcountry;
  }

  async remove(id: number) {
    const country = await this.countryRepo.findOne({ where: { id: id } });
    if (!country) {
      throw new BadRequestException('country not found');
    }
    await this.countryRepo.destroy({ where: { id: id } });
    return { message: 'country deleted', country };
  }
}
