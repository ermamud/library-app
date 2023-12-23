// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { MyJwtModule } from '../jwt/jwt.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  imports: [MyJwtModule],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
