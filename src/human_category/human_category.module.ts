import { Module } from '@nestjs/common';
import { HumanCategoryService } from './human_category.service';
import { HumanCategoryController } from './human_category.controller';

@Module({
  controllers: [HumanCategoryController],
  providers: [HumanCategoryService]
})
export class HumanCategoryModule {}
