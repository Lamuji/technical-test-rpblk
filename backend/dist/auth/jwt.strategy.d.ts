import { Strategy } from 'passport-jwt';
import { PrismaService } from "src/prisma.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    validate(payload: {
        username: string;
    }): Promise<{
        id: number;
        firstname: string;
        lastname: string;
        username: string;
        email: string;
        password: string;
    }>;
}
export {};
