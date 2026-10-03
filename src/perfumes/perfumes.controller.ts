import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { PerfumesService } from './perfumes.service';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { QueryPerfumeDto } from './dto/query-perfume.dto';

@Controller('api/perfumes')
export class PerfumesController {
  constructor(private readonly perfumesService: PerfumesService) {}

  // GET /api/perfumes - 향수 목록 조회
  @Get()
  async findAll(@Query(ValidationPipe) query: QueryPerfumeDto) {
    return await this.perfumesService.findAll(query);
  }

  // GET /api/perfumes/brands - 브랜드 목록
@Get('brands')
async getBrands() {
  return await this.perfumesService.getBrands();
}
  
  

  // GET /api/perfumes/compare?ids=id1,id2 - 향수 비교
  @Get('compare')
  async compare(@Query('ids') ids: string) {
    const perfumeIds = ids.split(',');
    return await this.perfumesService.compare(perfumeIds);
  }

  // GET /api/perfumes/:id - 향수 상세 조회
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.perfumesService.findOne(id);
  }

  // POST /api/perfumes - 향수 생성
  @Post()
  async create(@Body(ValidationPipe) createPerfumeDto: CreatePerfumeDto) {
    return await this.perfumesService.create(createPerfumeDto);
  }

  // DELETE /api/perfumes/:id - 향수 삭제
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.perfumesService.remove(id);
  }
}