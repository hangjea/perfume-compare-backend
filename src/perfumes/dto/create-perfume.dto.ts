import { IsString, IsNumber, IsOptional, IsInt, Min, Max } from 'class-validator';

export class CreatePerfumeDto {
  @IsString()
  name: string;

  @IsString()
  brand: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  image_url?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  longevity?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  sillage?: number;
}