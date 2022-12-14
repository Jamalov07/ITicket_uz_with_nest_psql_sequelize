import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HumanCategoryService } from './human_category.service';
import { CreateHumanCategoryDto } from './dto/create-human_category.dto';
import { UpdateHumanCategoryDto } from './dto/update-human_category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Human_Category } from './human_category.model';

@ApiTags('human category')
@Controller('human-category')
export class HumanCategoryController {
  constructor(private readonly humanCategoryService: HumanCategoryService) {}

  @ApiOperation({ summary: 'humanCategory  create' })
  @ApiResponse({ status: 200, type: Human_Category })
  @Post()
  create(@Body() createHumanCategoryDto: CreateHumanCategoryDto) {
    return this.humanCategoryService.create(createHumanCategoryDto);
  }

  @ApiOperation({ summary: 'humanCategory  get all' })
  @ApiResponse({ status: 200, type: [Human_Category] })
  @Get()
  findAll() {
    return this.humanCategoryService.findAll();
  }

  @ApiOperation({ summary: 'humanCategory  get one' })
  @ApiResponse({ status: 200, type: Human_Category })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.humanCategoryService.findOne(+id);
  }

  @ApiOperation({ summary: 'humanCategory  edit' })
  @ApiResponse({ status: 200, type: Human_Category })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHumanCategoryDto: UpdateHumanCategoryDto,
  ) {
    return this.humanCategoryService.update(+id, updateHumanCategoryDto);
  }
  
  @ApiOperation({ summary: 'humanCategory  delete' })
  @ApiResponse({ status: 200, type: Human_Category })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.humanCategoryService.remove(+id);
  }
}
