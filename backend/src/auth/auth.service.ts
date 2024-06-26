import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt'
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/users/users.model';


@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private jwtService: JwtService,
        private readonly usersService: UsersService){}


        async login(loginDto: LoginDto): Promise<any> {
            const {email, password} = loginDto;
            const users = await this.prismaService.client.user.findUnique({
                where:{ email }
            })
            if (!users)
                throw new NotFoundException('User not found.')

            const validatePassword = await bcrypt.compare(password, users.password)

            if (!validatePassword)
                throw new NotFoundException('Invalid password')

            //const payload = { email: users.email, username: users.username, firstname: users.firstname, lastname: users.lastname};
            const token = this.jwtService.sign(
                { email },
                { secret: process.env.JWT_SECRET, expiresIn: '1h' }
              );
              return { token , users : { email: users.email, username: users.username, firstname: users.firstname, lastname: users.lastname}

              }
    }

    async register(createDto: RegisterUserDto): Promise<any> {
        const registerUsers = new User()
        registerUsers.lastname = createDto.lastname
        registerUsers.firstname = createDto.firstname
        registerUsers.username = createDto.username, 
        registerUsers.email = createDto.email, 
        registerUsers.password = await bcrypt.hash(createDto.password, 10)
        
        const user = await this.usersService.registerUser(registerUsers)
        const token = this.jwtService.sign(
            { username: user.username },
            { secret: process.env.JWT_SECRET, expiresIn: '1h' }
          );
          return { token };
    }
}
