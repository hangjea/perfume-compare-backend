import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfumesController } from './perfumes.controller';
import { PerfumesService } from './perfumes.service';
import { Perfume } from './entities/perfume.entity';
import { Note } from '../notes/entities/note.entity';
import { PurchaseLink } from '../purchase-links/entities/purchase-link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Perfume, Note, PurchaseLink])],
  controllers: [PerfumesController],
  providers: [PerfumesService],
  exports: [PerfumesService],
})
export class PerfumesModule {}