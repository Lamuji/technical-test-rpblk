import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { AuthController } from "src/auth/auth.controller";
import { UsersService } from "./users.service";
import { PrismaService } from "src/prisma.service";
import { AuthService } from "src/auth/auth.service";
import { JwtService } from "@nestjs/jwt";

@Module({
    controllers: [UsersController, AuthController],
    providers: [AuthService, UsersService, PrismaService, JwtService]
})

export class UsersModule {}