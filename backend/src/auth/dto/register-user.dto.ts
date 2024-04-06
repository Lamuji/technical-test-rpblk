import { IsEmail, IsString, Length, isEmail } from "class-validator";


export class RegisterUserDto {
    @IsString()
    name: string

    @IsString()
    username: string;

    @IsString()
    email: string;
    
    @IsString()
    password: string;
}