import { PrismaService } from "src/prisma.service";
import { Post, User } from "./users.model";
export declare class UsersService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getAllUsers(): Promise<User[]>;
    registerUser(data: User): Promise<any>;
    createPost(username: string, postMessage: any): Promise<Post>;
}
