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
const users_model_1 = require("./users.model");
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor(prismaService) {
        this.prismaService = prismaService;
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
    async createPost(username, postMessage) {
        const newPost = new users_model_1.Post();
        newPost.username = username;
        newPost.message = postMessage.content;
        return await newPost.save();
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map