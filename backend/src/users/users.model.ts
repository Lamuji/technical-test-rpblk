import { Prisma } from "@prisma/client";

export class User  implements Prisma.UserCreateInput {
    name: string;
    username: string;
    email: string;
    password: string;
}