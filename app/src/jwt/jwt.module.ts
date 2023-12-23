// src/jwt/jwt.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10m' }, // Set token expiration to 10 minutes
    }),
  ],
  exports: [JwtModule],
})
export class MyJwtModule {}
