import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Perfume } from './entities/perfume.entity';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { QueryPerfumeDto } from './dto/query-perfume.dto';

@Injectable()
export class PerfumesService {
  constructor(
    @InjectRepository(Perfume)
    private perfumeRepository: Repository<Perfume>,
  ) {}

  // 향수 목록 조회 (페이지네이션, 검색, 필터)
  async findAll(query: QueryPerfumeDto) {
  const { page = 1, limit = 20, search, brand, sort } = query;
  const skip = (page - 1) * limit;
  const where: any = {};

  if (search) {
    where.name = Like(`%${search}%`);
  }
  if (brand) {
    where.brand = brand;
  }

  // 정렬 설정
  let order: any = { created_at: 'DESC' };
  if (sort === 'price_asc') order = { price: 'ASC' };
  else if (sort === 'price_desc') order = { price: 'DESC' };
  else if (sort === 'name_asc') order = { name: 'ASC' };
  else if (sort === 'longevity_desc') order = { longevity: 'DESC' };
  else if (sort === 'sillage_desc') order = { sillage: 'DESC' };

  const [data, total] = await this.perfumeRepository.findAndCount({
    where,
    relations: ['notes', 'purchaseLinks'],
    take: limit,
    skip,
    order,
  });

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };

  }
  async getBrands(): Promise<string[]> {
  const result = await this.perfumeRepository
    .createQueryBuilder('perfume')
    .select('DISTINCT perfume.brand', 'brand')
    .orderBy('perfume.brand', 'ASC')
    .getRawMany();
  return result.map((r) => r.brand);
}

  // 향수 상세 조회
  async findOne(id: string) {
    const perfume = await this.perfumeRepository.findOne({
      where: { id },
      relations: ['notes', 'purchaseLinks'],
    });

    if (!perfume) {
      throw new NotFoundException(`Perfume with ID ${id} not found`);
    }

    return perfume;
  }

  // 향수 비교
  async compare(ids: string[]) {
    if (ids.length !== 2) {
      throw new Error('Exactly 2 perfume IDs are required for comparison');
    }

    const perfumes = await Promise.all(ids.map((id) => this.findOne(id)));

    // 공통 노트 찾기
    const notes1 = perfumes[0].notes.map((n) => n.ingredient_name);
    const notes2 = perfumes[1].notes.map((n) => n.ingredient_name);
    const commonNotes = notes1.filter((note) => notes2.includes(note));

    return {
      perfumes,
      comparison: {
        commonNotes,
        uniqueNotes: {
          perfume1: notes1.filter((note) => !notes2.includes(note)),
          perfume2: notes2.filter((note) => !notes1.includes(note)),
        },
      },
    };
  }

  // 향수 생성
  async create(createPerfumeDto: CreatePerfumeDto) {
    const perfume = this.perfumeRepository.create(createPerfumeDto);
    return await this.perfumeRepository.save(perfume);
  }

  // 향수 삭제
  async remove(id: string) {
    const perfume = await this.findOne(id);
    await this.perfumeRepository.remove(perfume);
    return { message: 'Perfume deleted successfully' };
  }
}