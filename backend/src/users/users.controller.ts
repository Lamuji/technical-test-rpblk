import { Controller, Get, Post , Body, Req, Res, HttpException, HttpStatus, Query, NotFoundException } from "@nestjs/common";
import { Request, Response} from 'express'
import { UsersService } from "./users.service";
import { Post as post} from "./users.model";
import { CreatePostDto } from "src/auth/dto/post-dto";
import { PrismaService } from "src/prisma.service";

@Controller("users")
export class UsersController {
    constructor(private readonly userService: UsersService, private readonly prisma: PrismaService){}

    @Get('userlist')
    async getAllUsers(@Req() request: Request, @Res() response: Response): Promise<any> {
        try {
            const result= await this.userService.getAllUsers()
            return response.status(200).json({
                status:"ok",
                message:"Successfully fetch data!",
                result: result
            })
        }
        catch(err) {
            return response.status(500).json({
                status: "ok",
                message: "Internal server error."
            })
        }
    }

    @Get('getUser')
    async getUserByEmail(@Res({passthrough: true}) response: Response, @Query('email') email: string) {
        try {
            const result = await this.userService.getUserByEmail(email);
            return result
        }
        catch(err){
            return response.status(500).json({
            status:'Error',
            message:'Internal server error.',
        })
    }
}
    

    @Post('createPost')
    async create(@Body() createPostDto: CreatePostDto) {
        return this.userService.createPost(createPostDto);
    }

    @Get('getPosts')
    async getAllPosts() {
      return this.userService.getAllPosts();
    }

    @Post('toggleLike')
    async toggleLike(@Body() postData: { id: number, liked: boolean }) {
        try {
          const post = await this.prisma.client.post.findUnique({
            where: {
              id: postData.id,
            },
          });
        
          if (!post) {
            return { success: false, message: 'Le post n\'existe pas.' };
          }
        
          await this.prisma.client.post.update({
            where: {
              id: postData.id,
            },
            data: {
              like: postData.liked ? { increment: 1 } : { decrement: 1 },
            },
          });
        
          return { success: true, message: `Like ${postData.liked ? 'ajouté' : 'retiré'} avec succès.` };
        } catch (error) {
          return { success: false, message: 'Une erreur est survenue.' };
        }
    }
    
    @Post('toggleDislike')
    async toggleDislike(@Body() postData: { id: number, disliked: boolean }) {
        try {
          const post = await this.prisma.client.post.findUnique({
            where: {
              id: postData.id,
            },
          });
        
          if (!post) {
            return { success: false, message: 'Le post n\'existe pas.' };
          }
        
          await this.prisma.client.post.update({
            where: {
              id: postData.id,
            },
            data: {
              dislike: postData.disliked ? { increment: 1 } : { decrement: 1 },
            },
          });
        
          return { success: true, message: `Dislike ${postData.disliked ? 'ajouté' : 'retiré'} avec succès.` };
        } catch (error) {
          return { success: false, message: 'Une erreur est survenue.' };
        }
    }
    
}
    
