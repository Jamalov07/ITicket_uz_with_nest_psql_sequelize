import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { JwtPayload } from '../types/jwtPayload.type';
import { ResponseToAdmin } from '../types/resToAdminorCustomer.type';
import { Tokens } from '../types/tokens.type';
import { Admin } from './admin.model';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { AuthBody } from '../types/loginAdmin.type';
@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepo: typeof Admin,
    private readonly jwtService: JwtService,
  ) {}
  async create(createAdminDto: CreateAdminDto, res: Response) {
    const candidate = await this.adminRepo.findOne({
      where: { login: createAdminDto.login },
    });
    if (candidate) {
      throw new BadRequestException('this login already exists in database');
    }
    const hashed_password = await bcrypt.hash(
      createAdminDto.hashed_password,
      7,
    );
    const newAdmin = await this.adminRepo.create({
      ...createAdminDto,
      hashed_password,
    });
    const tokens = await this.getTokens(
      newAdmin.id,
      newAdmin.login,
      newAdmin.is_active,
      newAdmin.is_creator,
    );

    await this.updateRefreshTokenHash(newAdmin.id, tokens.refresh_token);
    const response: ResponseToAdmin = {
      message: 'Admin Created',
      admin: newAdmin,
      tokens: tokens,
    };
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return response;
  }

  async loginAdmin(authBody: AuthBody, res: Response) {
    const { login, password } = authBody;
    const admin = await this.adminRepo.findOne({ where: { login } });
    if (!admin) {
      throw new UnauthorizedException('Admin unauthorized1');
    }
    const ifTrue = await bcrypt.compare(password, admin.hashed_password);
    if (!ifTrue) {
      throw new UnauthorizedException('Admin unauthorized2');
    }
    const tokens = await this.getTokens(
      admin.id,
      admin.login,
      admin.is_active,
      admin.is_creator,
    );
    await this.updateRefreshTokenHash(admin.id, tokens.refresh_token);
    const response: ResponseToAdmin = {
      message: 'Admin has re-entered the site',
      admin: admin,
      tokens: tokens,
    };
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return response;
  }

  async refreshToken(adminId: number, refreshToken: string, res: Response) {
    const admin = await this.adminRepo.findOne({ where: { id: adminId } });
    if (!admin || !admin.hashed_refresh_token) {
      throw new ForbiddenException('yoki admin yoki refreshtokeni yoq');
    }
    const rMatches = await bcrypt.compare(
      refreshToken,
      admin.hashed_refresh_token,
    );
    if (!rMatches) {
      throw new ForbiddenException('Refresh token notogri shekillli');
    }

    const tokens = await this.getTokens(
      admin.id,
      admin.login,
      admin.is_active,
      admin.is_creator,
    );
    await this.updateRefreshTokenHash(admin.id, tokens.refresh_token);
    const response: ResponseToAdmin = {
      message: 'Admin has re-entered the site',
      admin: admin,
      tokens: tokens,
    };
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    const { sub, login, is_active, is_creator } = adminData;
    if (!adminData) {
      throw new UnauthorizedException('admin unauthorized logout');
    }
    const updatedAdmin = await (
      await this.adminRepo.update(
        {
          hashed_refresh_token: null,
        },
        { where: { id: sub }, returning: true },
      )
    )[1][0];
    res.clearCookie('refresh_token');
    return { message: 'admin has logged out', admin: updatedAdmin };
  }

  async findAll() {
    console.log(1234);
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

  async update(id: number, updateAdminDto: UpdateAdminDto, res: Response) {
    const admin = await this.adminRepo.findOne({ where: { id: id } });
    if (!admin) {
      throw new BadRequestException('Admin not found');
    }
    // console.log(admin);

    if (updateAdminDto.login) {
      const candidate = await this.adminRepo.findOne({
        where: { login: updateAdminDto.login },
      });
      if (candidate && candidate.id != id) {
        throw new BadRequestException('this login already exists in database');
      }
    }
    let hash_password: string;
    if (updateAdminDto.hashed_password) {
      hash_password = await bcrypt.hash(updateAdminDto.hashed_password, 7);
    }
    let hashed_password = hash_password || admin.hashed_password;
    console.log(hashed_password, 'bu yangi');
    const updatedAdmin = await (
      await this.adminRepo.update(
        {
          ...updateAdminDto,
        },
        { where: { id }, returning: true },
      )
    )[1][0];
    const tokens = await this.getTokens(
      updatedAdmin.id,
      updatedAdmin.login,
      updatedAdmin.is_active,
      updatedAdmin.is_creator,
    );
    const response: ResponseToAdmin = {
      message: 'Admin Updated',
      admin: updatedAdmin,
      tokens: tokens,
    };
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return response;
  }

  async remove(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id: id } });
    if (!admin) {
      throw new BadRequestException('Admin not found');
    }
    await this.adminRepo.destroy({ where: { id: id } });
    return { message: 'admin deleted', admin };
  }

  async getTokens(
    adminId: number,
    login: string,
    is_active: boolean,
    is_creator: boolean,
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: adminId,
      login,
      is_active,
      is_creator,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRefreshTokenHash(
    adminId: number,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.adminRepo.update(
      { hashed_refresh_token: hashedRefreshToken },
      { where: { id: adminId } },
    );
  }
}
