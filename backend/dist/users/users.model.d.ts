import { Prisma } from "@prisma/client";
export declare class User implements Prisma.UserCreateInput {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
}
export declare class Post implements Prisma.PostCreateInput {
    username: string;
    firstname: string;
    lastname: string;
    message: string;
    like: number;
    dislike: number;
}
