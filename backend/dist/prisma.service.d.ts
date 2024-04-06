import { OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
export declare class PrismaService implements OnModuleInit {
    private prismaClient;
    constructor();
    onModuleInit(): Promise<void>;
    get client(): PrismaClient;
}
