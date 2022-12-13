import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { cookieGetter } from '../decorators/cookieGetter.decorator';
import { AdminGuard } from '../guards/jwtAdmin.guard';
import { AuthBody } from '../types/loginAdmin.type';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.create(createAdminDto, res);
  }

  @Post('login')
  login(@Body() authBody: AuthBody, @Res({ passthrough: true }) res: Response) {
    return this.adminService.loginAdmin(authBody, res);
  }

  @Post(':id/refresh')
  refreshToken(
    @Param('id') id: string,
    @cookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshToken(+id, refreshToken, res);
  }

  @Post('logout')
  logout(
    @cookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('aslom', refreshToken);
    return this.adminService.logout(refreshToken, res);
  }

  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    console.log('hello');
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.update(+id, updateAdminDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
