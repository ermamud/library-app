import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Book } from '../schema';

export class GetBooksDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  take: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  skip: number;

  @IsString()
  @IsOptional()
  search: string;

  @IsString()
  @IsOptional()
  sortField: string;
}

export class GetBooksResponseDto {
  books: Book[];
  total: number;
}
