import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { MyJwtModule } from 'src/jwt/jwt.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BookForFeature } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([BookForFeature]),
    AuthModule,
    MyJwtModule,
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
