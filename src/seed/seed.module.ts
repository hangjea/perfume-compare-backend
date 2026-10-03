import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { Perfume } from '../perfumes/entities/perfume.entity';
import { Note } from '../notes/entities/note.entity';
import { PurchaseLink } from '../purchase-links/entities/purchase-link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Perfume, Note, PurchaseLink])],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}