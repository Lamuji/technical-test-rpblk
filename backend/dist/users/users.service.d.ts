import { PrismaService } from "src/prisma.service";
import { Post, User } from "./users.model";
import { JwtService } from "@nestjs/jwt";
import { PostGateway } from '../post.gateway';
export declare class UsersService {
    private prismaService;
    private jwtService;
    private readonly postGateway;
    constructor(prismaService: PrismaService, jwtService: JwtService, postGateway: PostGateway);
    getAllUsers(): Promise<User[]>;
    registerUser(data: User): Promise<any>;
    createPost(data: Post): Promise<Post>;
    getUserByEmail(email: string): Promise<any>;
    getAllPosts(): Promise<Post[]>;
    sendTweet(post: any): Promise<void>;
    incrementLike(): Promise<void>;
    incrementDislike(): Promise<void>;
    decrementLike(): Promise<void>;
    decremementDislike(): Promise<void>;
}
