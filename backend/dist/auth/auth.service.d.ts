import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
export declare class AuthService {
    private readonly prismaService;
    private jwtService;
    private readonly usersService;
    constructor(prismaService: PrismaService, jwtService: JwtService, usersService: UsersService);
    login(loginDto: LoginDto): Promise<any>;
    register(createDto: RegisterUserDto): Promise<any>;
}
