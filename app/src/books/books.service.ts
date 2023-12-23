import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateBookDto,
  EditBookDto,
  GetBooksDto,
  GetBooksResponseDto,
} from './dto';
import { Book } from './schema';
import * as seedData from './seed/books.json';

@Injectable()
export class BooksService implements OnModuleInit {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();

    if (!book) {
      throw new NotFoundException(`Book ${id} not found`);
    }

    return book;
  }

  async findAll(params: GetBooksDto): Promise<GetBooksResponseDto> {
    const take = params.take || 10;
    const skip = params.skip || 0;
    const sortField = params.sortField || 'createdAt';
    const sortOrder = sortField === 'createdAt' ? -1 : 1;

    const search = params.search
      ? { title: { $regex: params.search, $options: 'i' } }
      : {};

    const total = await this.bookModel.countDocuments(search).exec();
    const books = await this.bookModel
      .find(search)
      .skip(skip)
      .limit(take)
      .sort({ [sortField]: sortOrder })
      .exec();

    return { books, total };
  }

  create(book: CreateBookDto): Promise<Book> {
    const newBook = new this.bookModel(book);
    return newBook.save();
  }

  async update(id: string, book: EditBookDto): Promise<Book> {
    const ebook = await this.bookModel.findByIdAndUpdate(id, book).exec();

    if (!ebook) {
      throw new NotFoundException(`Book ${id} not found`);
    }

    return await this.findOne(id);
  }

  async remove(id: string): Promise<Book> {
    const ebook = await this.bookModel.findByIdAndDelete(id).exec();

    if (!ebook) {
      throw new NotFoundException(`Book ${id} not found`);
    }

    return ebook;
  }

  // seeding data
  async onModuleInit() {
    const count = await this.bookModel.countDocuments().exec();

    if (count === 0) {
      (seedData as CreateBookDto[]).forEach(async (book) => {
        this.create(book);
      });
    }
  }
}
