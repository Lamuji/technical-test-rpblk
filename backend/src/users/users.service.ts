
import { PrismaService } from "src/prisma.service";
import { Post, User } from "./users.model";
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

    async createPost(username: string, message: string): Promise<any> {
        return this.prismaService.client.post.create({
          data: {
            username,
            message,
            like: 0,
            dislike: 0 // Initialisation du nombre de 'like' à 0
          },
        });
      }

    async incrementLike()
}
