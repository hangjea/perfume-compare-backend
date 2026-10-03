import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseLinksService } from './purchase-links.service';
import { PurchaseLink } from './entities/purchase-link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseLink])],
  providers: [PurchaseLinksService],
  exports: [PurchaseLinksService],
})
export class PurchaseLinksModule {}