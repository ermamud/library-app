import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { BooksService } from './books.service';
import {
  CreateBookDto,
  EditBookDto,
  GetBooksDto,
  GetBooksResponseDto,
} from './dto';
import { Book } from './schema';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get()
  findAll(@Query() params: GetBooksDto): Promise<GetBooksResponseDto> {
    return this.bookService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createBook(@Body() body: CreateBookDto): Promise<Book> {
    return this.bookService.create(body);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateBook(
    @Param('id') id: string,
    @Body() body: EditBookDto,
  ): Promise<Book> {
    return this.bookService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string): Promise<Book> {
    return this.bookService.remove(id);
  }
}
