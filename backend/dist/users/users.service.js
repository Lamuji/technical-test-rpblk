"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const prisma_service_1 = require("../prisma.service");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const library_1 = require("@prisma/client/runtime/library");
const post_gateway_1 = require("../post.gateway");
let UsersService = class UsersService {
    constructor(prismaService, jwtService, postGateway) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.postGateway = postGateway;
    }
    async getAllUsers() {
        return this.prismaService.client.user.findMany();
    }
    async registerUser(data) {
        const existingUser = await this.prismaService.client.user.findUnique({
            where: {
                username: data.username
            }
        });
        if (existingUser) {
            throw new common_1.ConflictException("username already exists.");
        }
        return this.prismaService.client.user.create({
            data
        });
    }
    async createPost(data) {
        return this.prismaService.client.post.create({
            data,
        });
    }
    async getUserByEmail(email) {
        try {
            const user = await this.prismaService.client.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (!user) {
                throw new common_1.NotFoundException(`Aucun utilisateur trouvé avec l'email ${email}`);
            }
            return user;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                throw new Error('Erreur de base de données');
            }
            throw error;
        }
    }
    async getAllPosts() {
        return this.prismaService.client.post.findMany();
    }
    async sendTweet(post) {
        this.postGateway.sendPost(post);
    }
    async incrementLike() { }
    async incrementDislike() { }
    async decrementLike() { }
    async decremementDislike() { }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService, post_gateway_1.PostGateway])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map