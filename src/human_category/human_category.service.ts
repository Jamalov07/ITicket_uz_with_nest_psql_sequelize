import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateHumanCategoryDto } from './dto/create-human_category.dto';
import { UpdateHumanCategoryDto } from './dto/update-human_category.dto';
import { Human_Category } from './human_category.model';

@Injectable()
export class HumanCategoryService {
  constructor(
    @InjectModel(Human_Category)
    private humanCateRepo: typeof Human_Category,
  ) {}

  async create(createHuman_categoryDto: CreateHumanCategoryDto) {
    const candidate = await this.humanCateRepo.findOne({
      where: { ...createHuman_categoryDto },
    });
    if (candidate) {
      throw new BadRequestException('this datas already axists in database');
    }
    const newHuman_category = await this.humanCateRepo.create(
      createHuman_categoryDto,
    );
    return newHuman_category;
  }

  async findAll() {
    const human_categorys = await this.humanCateRepo.findAll();
    if (!human_categorys) {
      throw new BadRequestException('human_categorys not found');
    }
    return human_categorys;
  }

  async findOne(id: number) {
    const human_category = await this.humanCateRepo.findOne({
      where: { id: id },
    });
    if (!human_category) {
      throw new BadRequestException('human_category not found');
    }
    return human_category;
  }

  async update(id: number, updatehuman_categoryDto: UpdateHumanCategoryDto) {
    const human_category = await this.humanCateRepo.findOne({
      where: { id: id },
    });
    if (!human_category) {
      throw new BadRequestException('human_category not found');
    }

    const candidate = await this.humanCateRepo.findOne({
      where: { ...updatehuman_categoryDto },
    });
    if (candidate && candidate.id != id) {
      throw new BadRequestException('This data already exists');
    }

    const updatedHuman_category = await (
      await this.humanCateRepo.update(updatehuman_categoryDto, {
        where: { id: id },
        returning: true,
      })
    )[1][0];
    return updatedHuman_category;
  }

  async remove(id: number) {
    const human_category = await this.humanCateRepo.findOne({
      where: { id: id },
    });
    if (!human_category) {
      throw new BadRequestException('human_category not found');
    }
    await this.humanCateRepo.destroy({ where: { id: id } });

    return { message: 'human_category deleted', human_category };
  }
}
