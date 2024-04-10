import { PrismaService } from "src/prisma.service";
import { Post, User } from "./users.model";
import { JwtService } from "@nestjs/jwt";
export declare class UsersService {
    private prismaService;
    private jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    getAllUsers(): Promise<User[]>;
    registerUser(data: User): Promise<any>;
    createPost(data: Post): Promise<Post>;
    getUserByEmail(email: string): Promise<any>;
    getAllPosts(): Promise<Post[]>;
    incrementLike(): Promise<void>;
    incrementDislike(): Promise<void>;
    decrementLike(): Promise<void>;
    decremementDislike(): Promise<void>;
}
