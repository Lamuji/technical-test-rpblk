import { Controller, Get, Post , Body, Req, Res, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response} from 'express'
import { UsersService } from "./users.service";

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

    @Post('createPost')
    async createPost(@Req() request, @Res() response, @Body() body) {
        try {
            const username = request.user.username; // Ou d'où vous récupérez l'username de l'utilisateur
            const newTweet = await this.userService.createPost(username, body);
            return newTweet; // Nest gère la réponse, pas besoin d'injecter @Res()
          } catch (error) {
            throw new HttpException('Failed to create a post', HttpStatus.BAD_REQUEST);
          }
        }
}