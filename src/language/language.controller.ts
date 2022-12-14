import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Language } from './language.model';

@ApiTags('language')
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @ApiOperation({ summary: 'language  create' })
  @ApiResponse({ status: 200, type: Language })
  @Post()
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languageService.create(createLanguageDto);
  }


  @ApiOperation({ summary: 'language  get all' })
  @ApiResponse({ status: 200, type: [Language] })
  @Get()
  findAll() {
    return this.languageService.findAll();
  }


  @ApiOperation({ summary: 'language  get one' })
  @ApiResponse({ status: 200, type: Language })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.languageService.findOne(+id);
  }


  @ApiOperation({ summary: 'language  edit' })
  @ApiResponse({ status: 200, type: Language })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ) {
    return this.languageService.update(+id, updateLanguageDto);
  }


  @ApiOperation({ summary: 'language  delete' })
  @ApiResponse({ status: 200, type: Language })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.languageService.remove(+id);
  }
}
