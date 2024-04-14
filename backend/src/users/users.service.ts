
import { PrismaService } from "src/prisma.service";
import { Post, Profil, User } from "./users.model";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


@Injectable()
export class UsersService {
    constructor(private prismaService : PrismaService, private jwtService : JwtService){}

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

    async createPost(data: Post): Promise<Post> {
      return this.prismaService.client.post.create({
        data
      });
    }

      async getUserByEmail(email: string): Promise<Profil> {
        try {
          const user = await this.prismaService.client.user.findUnique({
            where: {
              email: email,
            },
          });
          if (!user) {
            throw new NotFoundException(`Aucun utilisateur trouvé avec l'email ${email}`);
          }
          return user;
        } catch (error) {
          if (error instanceof PrismaClientKnownRequestError) {
            // Gérer les erreurs connues de Prisma ici
            throw new Error('Erreur de base de données');
          }
          throw error; // Renvoyer les autres erreurs inattendues
        }
      }
      async getAllPosts(): Promise<Post[]> {
        return this.prismaService.client.post.findMany();
      }
      
      async updateLike(postId: number, increment: boolean): Promise<void> {
        const action = increment ? { increment: 1 } : { decrement: 1 };
        await this.prismaService.client.post.update({
            where: { id: postId },
            data: { like: action }
        });
    }

    async updateDislike(postId: number, increment: boolean): Promise<void> {
        const action = increment ? { increment: 1 } : { decrement: 1 };
        await this.prismaService.client.post.update({
            where: { id: postId },
            data: { dislike: action }
        });
    }

    async getPostById(postId: number): Promise<Post> {
        const post = await this.prismaService.client.post.findUnique({
            where: { id: postId }
        });
        if (!post) {
            throw new NotFoundException(`Post not found with ID ${postId}`);
        }
        return post;
    }
}
