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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { cookieGetter } from '../decorators/cookieGetter.decorator';
import { AdminEditGuard } from '../guards/AdminEdit.guard';
import { AdminGuard } from '../guards/jwtAdmin.guard';
import { CreatorGuard } from '../guards/jwtCreator.guard';
import { AuthBody } from '../types/loginAdmin.type';
import { Admin } from './admin.model';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ResponseToAdmin } from '../types/resToAdminorCustomer.type';

@ApiTags('Adminlar')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Admin create' })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(CreatorGuard)
  @Post()
  create(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.create(createAdminDto, res);
  }

  @ApiOperation({ summary: 'Admin login' })
  @ApiResponse({ status: 200, type: Admin })
  @Post('login')
  login(@Body() authBody: AuthBody, @Res({ passthrough: true }) res: Response) {
    return this.adminService.loginAdmin(authBody, res);
  }

  @ApiOperation({ summary: 'Admin refresh token' })
  @ApiResponse({ status: 200, type: Admin })
  @Post(':id/refresh')
  refreshToken(
    @Param('id') id: string,
    @cookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({ summary: 'Admin logout' })
  @ApiResponse({ status: 200, type: Admin })
  @Post('logout')
  logout(
    @cookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('aslom', refreshToken);
    return this.adminService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'get all Admins ' })
  @ApiResponse({ status: 200, type: [Admin] })
  @UseGuards(CreatorGuard)
  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    console.log('hello');
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'get one Admin ' })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(AdminEditGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: 'Admin edit' })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(AdminEditGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.update(+id, updateAdminDto, res);
  }

  @ApiOperation({ summary: 'Admin delete' })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(AdminEditGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
