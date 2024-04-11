import { Request, Response } from 'express';
import { UsersService } from "./users.service";
import { Post as post } from "./users.model";
import { CreatePostDto } from "src/auth/dto/post-dto";
import { PrismaService } from "src/prisma.service";
export declare class UsersController {
    private readonly userService;
    private readonly prisma;
    constructor(userService: UsersService, prisma: PrismaService);
    getAllUsers(request: Request, response: Response): Promise<any>;
    getUserByEmail(response: Response, email: string): Promise<import("./users.model").Profil | Response<any, Record<string, any>>>;
    create(createPostDto: CreatePostDto): Promise<post>;
    getAllPosts(): Promise<post[]>;
    addLike(postData: CreatePostDto): Promise<{
        success: boolean;
        message: string;
    }>;
    addDislike(postData: CreatePostDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
