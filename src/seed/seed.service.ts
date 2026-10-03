import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Perfume } from '../perfumes/entities/perfume.entity';
import { Note, NoteType } from '../notes/entities/note.entity';
import { PurchaseLink } from '../purchase-links/entities/purchase-link.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Perfume)
    private perfumeRepository: Repository<Perfume>,
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
    @InjectRepository(PurchaseLink)
    private purchaseLinkRepository: Repository<PurchaseLink>,
  ) {}

  async seed() {
    try {
      // 기존 데이터가 있으면 삭제 (없으면 무시)
      const allNotes = await this.noteRepository.find();
      if (allNotes.length > 0) {
        await this.noteRepository.remove(allNotes);
      }

      const allLinks = await this.purchaseLinkRepository.find();
      if (allLinks.length > 0) {
        await this.purchaseLinkRepository.remove(allLinks);
      }

      const allPerfumes = await this.perfumeRepository.find();
      if (allPerfumes.length > 0) {
        await this.perfumeRepository.remove(allPerfumes);
      }

      console.log('🗑️ Cleared all existing data');
    } catch (error) {
      console.log('⚠️ No existing data to clear');
    }

    // 향수 1: Chanel No.5
    const chanel = await this.perfumeRepository.save({
      name: 'No.5',
      brand: 'Chanel',
      price: 150000,
      image_url: 'https://via.placeholder.com/300x400?text=Chanel+No.5',
      description:
        '세계에서 가장 유명한 향수 중 하나. 우아하고 클래식한 플로럴 알데하이드 향수',
      longevity: 8,
      sillage: 9,
    });

    await this.noteRepository.save([
      {
        perfume_id: chanel.id,
        note_type: NoteType.TOP,
        ingredient_name: '알데하이드',
        percentage: 30,
      },
      {
        perfume_id: chanel.id,
        note_type: NoteType.TOP,
        ingredient_name: '네롤리',
        percentage: 20,
      },
      {
        perfume_id: chanel.id,
        note_type: NoteType.MIDDLE,
        ingredient_name: '재스민',
        percentage: 40,
      },
      {
        perfume_id: chanel.id,
        note_type: NoteType.MIDDLE,
        ingredient_name: '로즈',
        percentage: 30,
      },
      {
        perfume_id: chanel.id,
        note_type: NoteType.BASE,
        ingredient_name: '바닐라',
        percentage: 25,
      },
      {
        perfume_id: chanel.id,
        note_type: NoteType.BASE,
        ingredient_name: '샌달우드',
        percentage: 25,
      },
    ]);

    await this.purchaseLinkRepository.save([
      {
        perfume_id: chanel.id,
        platform_name: '신세계백화점',
        url: 'https://www.shinsegaemall.com',
        price: 150000,
        is_available: true,
      },
      {
        perfume_id: chanel.id,
        platform_name: '현대백화점',
        url: 'https://www.ehyundai.com',
        price: 148000,
        is_available: true,
      },
    ]);

    // 향수 2: Dior Sauvage
    const dior = await this.perfumeRepository.save({
      name: 'Sauvage',
      brand: 'Dior',
      price: 135000,
      image_url: 'https://via.placeholder.com/300x400?text=Dior+Sauvage',
      description: '야성적이고 신선한 남성 향수. 시원한 느낌과 스파이시한 조화',
      longevity: 9,
      sillage: 10,
    });

    await this.noteRepository.save([
      {
        perfume_id: dior.id,
        note_type: NoteType.TOP,
        ingredient_name: '베르가못',
        percentage: 35,
      },
      {
        perfume_id: dior.id,
        note_type: NoteType.TOP,
        ingredient_name: '페퍼',
        percentage: 25,
      },
      {
        perfume_id: dior.id,
        note_type: NoteType.MIDDLE,
        ingredient_name: '제라늄',
        percentage: 30,
      },
      {
        perfume_id: dior.id,
        note_type: NoteType.MIDDLE,
        ingredient_name: '라벤더',
        percentage: 20,
      },
      {
        perfume_id: dior.id,
        note_type: NoteType.BASE,
        ingredient_name: '앰버그리스',
        percentage: 30,
      },
      {
        perfume_id: dior.id,
        note_type: NoteType.BASE,
        ingredient_name: '시더우드',
        percentage: 30,
      },
    ]);

    await this.purchaseLinkRepository.save([
      {
        perfume_id: dior.id,
        platform_name: '신세계백화점',
        url: 'https://www.shinsegaemall.com',
        price: 135000,
        is_available: true,
      },
      {
        perfume_id: dior.id,
        platform_name: 'Sephora',
        url: 'https://www.sephora.kr',
        price: 132000,
        is_available: true,
      },
    ]);

    // 향수 3: Jo Malone Wood Sage & Sea Salt
    const joMalone = await this.perfumeRepository.save({
      name: 'Wood Sage & Sea Salt',
      brand: 'Jo Malone',
      price: 180000,
      image_url:
        'https://via.placeholder.com/300x400?text=Jo+Malone+Wood+Sage',
      description:
        '바다의 신선함과 세이지의 허브향이 조화로운 유니크한 향수',
      longevity: 6,
      sillage: 7,
    });

    await this.noteRepository.save([
      {
        perfume_id: joMalone.id,
        note_type: NoteType.TOP,
        ingredient_name: '앰브렛 시드',
        percentage: 30,
      },
      {
        perfume_id: joMalone.id,
        note_type: NoteType.TOP,
        ingredient_name: '시 솔트',
        percentage: 30,
      },
      {
        perfume_id: joMalone.id,
        note_type: NoteType.MIDDLE,
        ingredient_name: '세이지',
        percentage: 40,
      },
      {
        perfume_id: joMalone.id,
        note_type: NoteType.BASE,
        ingredient_name: '드리프트우드',
        percentage: 50,
      },
    ]);

    await this.purchaseLinkRepository.save([
      {
        perfume_id: joMalone.id,
        platform_name: '조말론 공식몰',
        url: 'https://www.jomalone.co.kr',
        price: 180000,
        is_available: true,
      },
    ]);

    // 향수 4: Tom Ford Black Orchid
    const tomFord = await this.perfumeRepository.save({
      name: 'Black Orchid',
      brand: 'Tom Ford',
      price: 220000,
      image_url:
        'https://via.placeholder.com/300x400?text=Tom+Ford+Black+Orchid',
      description:
        '관능적이고 럭셔리한 오리엔탈 향수. 블랙 오키드의 신비로운 향',
      longevity: 10,
      sillage: 9,
    });

    await this.noteRepository.save([
      {
        perfume_id: tomFord.id,
        note_type: NoteType.TOP,
        ingredient_name: '트러플',
        percentage: 20,
      },
      {
        perfume_id: tomFord.id,
        note_type: NoteType.TOP,
        ingredient_name: '블랙커런트',
        percentage: 20,
      },
      {
        perfume_id: tomFord.id,
        note_type: NoteType.MIDDLE,
        ingredient_name: '블랙 오키드',
        percentage: 40,
      },
      {
        perfume_id: tomFord.id,
        note_type: NoteType.MIDDLE,
        ingredient_name: '로터스',
        percentage: 20,
      },
      {
        perfume_id: tomFord.id,
        note_type: NoteType.BASE,
        ingredient_name: '패출리',
        percentage: 30,
      },
      {
        perfume_id: tomFord.id,
        note_type: NoteType.BASE,
        ingredient_name: '바닐라',
        percentage: 30,
      },
    ]);

    await this.purchaseLinkRepository.save([
      {
        perfume_id: tomFord.id,
        platform_name: '신세계백화점',
        url: 'https://www.shinsegaemall.com',
        price: 220000,
        is_available: true,
      },
      {
        perfume_id: tomFord.id,
        platform_name: 'Sephora',
        url: 'https://www.sephora.kr',
        price: 215000,
        is_available: true,
      },
    ]);

    console.log('✅ Seed data created successfully!');
    return {
      message: 'Seed data created',
      perfumes: [chanel, dior, joMalone, tomFord],
    };
  }
}