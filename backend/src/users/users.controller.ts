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

    @Post('like')
    async addLike(@Body() postData: CreatePostDto) {
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
              like: {
                increment: 1,
              },
            },
          });
    
          return { success: true, message: 'Like ajouté avec succès.' };
        } catch (error) {
          return { success: false, message: 'Une erreur est survenue lors de l\'ajout du like.' };
        }
      }

      @Post('dislike')
  async addDislike(@Body() postData: CreatePostDto) {
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
          dislike: {
            increment: 1,
          },
        },
      });

      return { success: true, message: 'Dislike ajouté avec succès.' };
    } catch (error) {
      return { success: false, message: 'Une erreur est survenue lors de l\'ajout du dislike.' };
    }
  }
}
    
