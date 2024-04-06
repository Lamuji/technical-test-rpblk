import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [],
  providers: [PrismaService, AuthService, UsersService, JwtService],
})
export class AppModule {}
