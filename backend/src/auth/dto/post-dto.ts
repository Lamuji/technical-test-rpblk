import { IsNotEmpty, IsString, MaxLength, IsInt, Min } from 'class-validator';

export class CreatePostDto {
    @IsNotEmpty({ message: 'Username cannot be empty.' })
    @IsString({ message: 'Username must be a string.' })
    readonly username: string;

    @IsNotEmpty({ message: 'Firstname cannot be empty.' })
    @IsString({ message: 'Firstname must be a string.' })
    readonly firstname: string;

    @IsNotEmpty({ message: 'Lastname cannot be empty.' })
    @IsString({ message: 'Lastname must be a string.' })
    readonly lastname: string;

    @IsNotEmpty({ message: 'The content cannot be empty.' })
    @IsString({ message: 'The content must be a string.' })
    @MaxLength(280, { message: 'The content is too long. Maximum length is 280 characters.' })
    readonly message: string;

    @IsInt({ message: 'Likes must be an integer.' })
    @Min(0, { message: 'Likes cannot be negative.' })
    readonly like: number;

    @IsInt({ message: 'Dislikes must be an integer.' })
    @Min(0, { message: 'Dislikes cannot be negative.' })
    readonly dislike: number;
    id: any;
}
