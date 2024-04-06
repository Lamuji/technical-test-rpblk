import { Prisma } from "@prisma/client";
export declare class User implements Prisma.UserCreateInput {
    name: string;
    username: string;
    email: string;
    password: string;
}
