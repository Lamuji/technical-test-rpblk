import { PrismaService } from "src/prisma.service";
import { Post, Profil, User } from "./users.model";
import { JwtService } from "@nestjs/jwt";
export declare class UsersService {
    private prismaService;
    private jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    getAllUsers(): Promise<User[]>;
    registerUser(data: User): Promise<any>;
    createPost(data: Post): Promise<Post>;
    getUserByEmail(email: string): Promise<Profil>;
    getAllPosts(): Promise<Post[]>;
    updateLike(postId: number, increment: boolean): Promise<void>;
    updateDislike(postId: number, increment: boolean): Promise<void>;
    getPostById(postId: number): Promise<Post>;
}
