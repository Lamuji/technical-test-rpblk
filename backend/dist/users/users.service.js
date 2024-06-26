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
let UsersService = class UsersService {
    constructor(prismaService, jwtService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
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
            data
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
    async findPostById(postId) {
        return this.prismaService.client.post.findUnique({
            where: { id: postId },
        });
    }
    async updateLike(postId, increment) {
        if (increment) {
            console.log("increment ok");
            await this.prismaService.client.post.update({
                where: { id: postId },
                data: { like: { increment: 1 } }
            });
        }
        else {
            const post = await this.prismaService.client.post.findUnique({
                where: { id: postId },
                select: { like: true }
            });
            if (post && post.like > 0) {
                await this.prismaService.client.post.update({
                    where: { id: postId },
                    data: { like: { decrement: 1 } }
                });
            }
        }
    }
    async updateDislike(postId, increment) {
        if (increment) {
            await this.prismaService.client.post.update({
                where: { id: postId },
                data: { dislike: { increment: 1 } }
            });
        }
        else {
            const post = await this.prismaService.client.post.findUnique({
                where: { id: postId },
                select: { dislike: true }
            });
            if (post && post.dislike > 0) {
                await this.prismaService.client.post.update({
                    where: { id: postId },
                    data: { dislike: { decrement: 1 } }
                });
            }
        }
    }
    async getPostById(postId) {
        const post = await this.prismaService.client.post.findUnique({
            where: { id: postId }
        });
        if (!post) {
            throw new common_1.NotFoundException(`Post not found with ID ${postId}`);
        }
        return post;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map