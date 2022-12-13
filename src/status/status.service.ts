import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './status.model';

@Injectable()
export class StatusService {
  constructor(
    @InjectModel(Status)
    private statusRepo: typeof Status,
  ) {}
  async create(createstatusDto: CreateStatusDto) {
    const candidate = await this.statusRepo.findOne({
      where: { name: createstatusDto.name },
    });
    if (candidate) {
      throw new BadRequestException('this name already axists in database');
    }
    const newstatus = await this.statusRepo.create(createstatusDto);
    return newstatus;
  }

  async findAll() {
    const statuss = await this.statusRepo.findAll();
    if (!statuss) {
      throw new BadRequestException('statuss not found');
    }
    return statuss;
  }

  async findOne(id: number) {
    const status = await this.statusRepo.findOne({
      where: { id: id },
    });
    if (!status) {
      throw new BadRequestException('status not found');
    }
    return status;
  }

  async update(id: number, updatestatusDto: UpdateStatusDto) {
    const status = await this.statusRepo.findOne({
      where: { id: id },
    });
    if (!status) {
      throw new BadRequestException('status not found');
    }
    if (updatestatusDto.name) {
      const candidate = await this.statusRepo.findOne({
        where: { name: updatestatusDto.name },
      });
      if (candidate && candidate.id != id) {
        throw new BadRequestException('This name already exists');
      }
    }
    const updatedstatus = await (
      await this.statusRepo.update(updatestatusDto, {
        where: { id: id },
        returning: true,
      })
    )[1][0];
    return updatedstatus;
  }

  async remove(id: number) {
    const status = await this.statusRepo.findOne({
      where: { id: id },
    });
    if (!status) {
      throw new BadRequestException('status not found');
    }
    await this.statusRepo.destroy({ where: { id: id } });
    return { message: 'status deleted', status };
  }
}
