import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './admin.model';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminRepo: typeof Admin) {}
  async create(createAdminDto: CreateAdminDto) {
    const candidate = await this.adminRepo.findOne({
      where: { login: createAdminDto.login },
    });
    if (candidate) {
      throw new BadRequestException('this login already exists in database');
    }
    const newAdmin = await this.adminRepo.create(createAdminDto);

    return newAdmin;
  }

  async findAll() {
    const admins = await this.adminRepo.findAll();
    if (!admins) {
      throw new BadRequestException('Admins not found');
    }
    return admins;
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id: id } });
    if (!admin) {
      throw new BadRequestException('Admin not found');
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminRepo.findOne({ where: { id: id } });
    if (!admin) {
      throw new BadRequestException('Admin not found');
    }
    const candidate = await this.adminRepo.findOne({
      where: { login: updateAdminDto.login },
    });
    if (candidate && candidate.id != id) {
      throw new BadRequestException('this login already exists in database');
    }

    const updatedAdmin = await this.adminRepo.update(
      { ...updateAdminDto },
      { where: { id: id } },
    );
    return updatedAdmin;
  }

  async remove(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id: id } });
    if (!admin) {
      throw new BadRequestException('Admin not found');
    }
    await this.adminRepo.destroy({ where: { id: id } });
    return { message: 'admin deleted', admin };
  }
}
