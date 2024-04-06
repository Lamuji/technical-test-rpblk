import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService implements OnModuleInit {
    // Déclaration de la variable pour stocker l'instance du client Prisma
    private prismaClient: PrismaClient;

    constructor() {
        // Initialisation de l'instance du client Prisma
        this.prismaClient = new PrismaClient();
    }

    async onModuleInit() {
        // Connexion à la base de données lors de l'initialisation du module
        await this.prismaClient.$connect();
    }

    // Méthode pour accéder à l'instance du client Prisma
    get client(): PrismaClient {
        return this.prismaClient;
    }
}