
import { PrismaService } from "src/prisma.service";
import { User } from "./users.model";
import { ConflictException, Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
    constructor(private prismaService : PrismaService){}

    async getAllUsers(): Promise<User[]>{
        return this.prismaService.client.user.findMany();
    }

    async registerUser(data : User): Promise<any> {
        const existingUser = await this.prismaService.client.user.findUnique({
            where: {
                username: data.username
            }
        })

        if (existingUser){
            throw new ConflictException("username already exists.")
        }
        return this.prismaService.client.user.create({
            data
        })
    }
}