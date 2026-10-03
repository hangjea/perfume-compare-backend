import { IsString, IsNumber, IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class CreatePurchaseLinkDto {
  @IsUUID()
  perfume_id: string;

  @IsString()
  platform_name: string;

  @IsString()
  url: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsBoolean()
  is_available?: boolean;
}