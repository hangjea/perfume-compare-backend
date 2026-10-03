import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseLinksService } from './purchase-links.service';

describe('PurchaseLinksService', () => {
  let service: PurchaseLinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseLinksService],
    }).compile();

    service = module.get<PurchaseLinksService>(PurchaseLinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
