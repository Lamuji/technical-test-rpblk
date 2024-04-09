import { Controller, Post, Req, Res, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import {Request, Response} from 'express'
import { RegisterUserDto } from './dto/register-user.dto';



@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}


    @Post('/login')
    async login(@Req() request: Request, @Res({passthrough: true}) response: Response, @Body() loginDto: LoginDto): Promise<any>{
        try {
            const result = await this.authService.login(loginDto);
            return response.status(200).json({
                status:'Ok',
                message:'Successfully login!',
                result: result
            })
        }catch(err) {
            console.log(err)
            return response.status(500).json({
                status:'Error',
                message:'Internal server error.',
            })
        }
    }

    @Post('/register')
    async register(@Req() request: Request, @Res() response: Response, @Body() registerDto: RegisterUserDto): Promise<any>{
        try {
            const result = await this.authService.register(registerDto);

            return response.status(200).json({
                status:'Ok',
                message:'Successfully registered!',
                result: result
            })
        }catch(err) {
            return response.status(500).json({
                status:'Error',
                message:'Internal server error.',
                error: err.message
            })
        }
    }
}
