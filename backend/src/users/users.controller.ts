import { Controller, Get, Post , Body, Req, Res, HttpException, HttpStatus, Query, NotFoundException } from "@nestjs/common";
import { Request, Response} from 'express'
import { UsersService } from "./users.service";
import { Post as post} from "./users.model";

@Controller("users")
export class UsersController {
    constructor(private readonly userService: UsersService){}

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
            return response.status(200).json({
                result: result
            })
        }
        catch(err){
            return response.status(500).json({
            status:'Error',
            message:'Internal server error.',
        })
    }
}
    
    

    @Post('createPost')
    async create(@Body() postData: post): Promise<post> {
    return this.userService.createPost(postData);
    }

    @Get('getPosts')
    async getAllPosts() {
      return this.userService.getAllPosts();
    }
}