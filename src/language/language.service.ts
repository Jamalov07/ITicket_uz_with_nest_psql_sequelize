import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './language.model';

@Injectable()
export class LanguageService {
  constructor(
    @InjectModel(Language)
    private languageRepo: typeof Language,
  ) {}
  async create(createlanguageDto: CreateLanguageDto) {
    const candidate = await this.languageRepo.findOne({
      where: { name: createlanguageDto.name },
    });
    if (candidate) {
      throw new BadRequestException('this name already axists in database');
    }
    const newlanguage = await this.languageRepo.create(createlanguageDto);
    return newlanguage;
  }

  async findAll() {
    const languages = await this.languageRepo.findAll();
    if (!languages) {
      throw new BadRequestException('languages not found');
    }
    return languages;
  }

  async findOne(id: number) {
    const language = await this.languageRepo.findOne({
      where: { id: id },
    });
    if (!language) {
      throw new BadRequestException('language not found');
    }
    return language;
  }

  async update(id: number, updatelanguageDto: UpdateLanguageDto) {
    const language = await this.languageRepo.findOne({
      where: { id: id },
    });
    if (!language) {
      throw new BadRequestException('language not found');
    }
    if (updatelanguageDto.name) {
      const candidate = await this.languageRepo.findOne({
        where: { name: updatelanguageDto.name },
      });
      if (candidate && candidate.id != id) {
        throw new BadRequestException('This name already exists');
      }
    }
    const updatedlanguage = await (
      await this.languageRepo.update(updatelanguageDto, {
        where: { id: id },
        returning: true,
      })
    )[1][0];
    return updatedlanguage;
  }

  async remove(id: number) {
    const language = await this.languageRepo.findOne({
      where: { id: id },
    });
    if (!language) {
      throw new BadRequestException('language not found');
    }
    await this.languageRepo.destroy({ where: { id: id } });
    return { message: 'language deleted', language };
  }
}
