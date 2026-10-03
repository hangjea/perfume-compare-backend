import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseLink } from './entities/purchase-link.entity';
import { CreatePurchaseLinkDto } from './dto/create-purchase-link.dto';

@Injectable()
export class PurchaseLinksService {
  constructor(
    @InjectRepository(PurchaseLink)
    private purchaseLinkRepository: Repository<PurchaseLink>,
  ) {}

  // 특정 향수의 구매 링크 조회
  async findByPerfumeId(perfumeId: string) {
    return await this.purchaseLinkRepository.find({
      where: { perfume_id: perfumeId, is_available: true },
    });
  }

  // 구매 링크 생성
  async create(createPurchaseLinkDto: CreatePurchaseLinkDto) {
    const link = this.purchaseLinkRepository.create(createPurchaseLinkDto);
    return await this.purchaseLinkRepository.save(link);
  }

  // 여러 구매 링크 한번에 생성
  async createMany(createPurchaseLinkDtos: CreatePurchaseLinkDto[]) {
    const links = this.purchaseLinkRepository.create(createPurchaseLinkDtos);
    return await this.purchaseLinkRepository.save(links);
  }
}