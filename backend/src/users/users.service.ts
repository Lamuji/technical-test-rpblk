
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

    async createPost(username: string, postMessage: any): Promise<Post> {
        // Ici, vous mettriez la logique pour créer un nouveau tweet en utilisant le modèle de tweet
        // et en sauvegardant le tweet dans la base de données.
    
        const newPost = new Post();
        newPost.username = username;
        newPost.message = postMessage.content; // Supposons que tweetContent contient une propriété 'content'
        // ... autres propriétés et logique de sauvegarde
        return await newPost.save();
      }
}