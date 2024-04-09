// post.dto.ts
import { IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';

export class CreatePostDto {
    @IsNotEmpty({ message: 'The content cannot be empty.' })
    @IsString({ message: 'The content must be a string.' })
    @MaxLength(280, {message: 'The content is too long. Maximum length is 280 characters.'})
    readonly content: string;

}
