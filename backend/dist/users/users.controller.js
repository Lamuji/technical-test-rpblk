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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const post_dto_1 = require("../auth/dto/post-dto");
const prisma_service_1 = require("../prisma.service");
let UsersController = class UsersController {
    constructor(userService, prisma) {
        this.userService = userService;
        this.prisma = prisma;
    }
    async getAllUsers(request, response) {
        try {
            const result = await this.userService.getAllUsers();
            return response.status(200).json({
                status: "ok",
                message: "Successfully fetch data!",
                result: result
            });
        }
        catch (err) {
            return response.status(500).json({
                status: "ok",
                message: "Internal server error."
            });
        }
    }
    async getUserByEmail(response, email) {
        try {
            const result = await this.userService.getUserByEmail(email);
            return result;
        }
        catch (err) {
            return response.status(500).json({
                status: 'Error',
                message: 'Internal server error.',
            });
        }
    }
    async create(createPostDto) {
        return this.userService.createPost(createPostDto);
    }
    async getAllPosts() {
        return this.userService.getAllPosts();
    }
    async toggleLike(postData) {
        try {
            const post = await this.prisma.client.post.findUnique({
                where: {
                    id: postData.id,
                },
            });
            if (!post) {
                return { success: false, message: 'Le post n\'existe pas.' };
            }
            await this.prisma.client.post.update({
                where: {
                    id: postData.id,
                },
                data: {
                    like: postData.liked ? { increment: 1 } : { decrement: 1 },
                },
            });
            return { success: true, message: `Like ${postData.liked ? 'ajouté' : 'retiré'} avec succès.` };
        }
        catch (error) {
            return { success: false, message: 'Une erreur est survenue.' };
        }
    }
    async toggleDislike(postData) {
        try {
            const post = await this.prisma.client.post.findUnique({
                where: {
                    id: postData.id,
                },
            });
            if (!post) {
                return { success: false, message: 'Le post n\'existe pas.' };
            }
            await this.prisma.client.post.update({
                where: {
                    id: postData.id,
                },
                data: {
                    dislike: postData.disliked ? { increment: 1 } : { decrement: 1 },
                },
            });
            return { success: true, message: `Dislike ${postData.disliked ? 'ajouté' : 'retiré'} avec succès.` };
        }
        catch (error) {
            return { success: false, message: 'Une erreur est survenue.' };
        }
    }
};
__decorate([
    (0, common_1.Get)('userlist'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('getUser'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserByEmail", null);
__decorate([
    (0, common_1.Post)('createPost'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('getPosts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllPosts", null);
__decorate([
    (0, common_1.Post)('toggleLike'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "toggleLike", null);
__decorate([
    (0, common_1.Post)('toggleDislike'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "toggleDislike", null);
UsersController = __decorate([
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [users_service_1.UsersService, prisma_service_1.PrismaService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map