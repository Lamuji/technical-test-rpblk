import { Prisma } from "@prisma/client";

export class User  implements Prisma.UserCreateInput {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
}

export class Post implements Prisma.PostCreateInput {
    username: string;
    firstname: string;
    lastname: string;
    message: string;
    like: number;
    dislike: number;
}