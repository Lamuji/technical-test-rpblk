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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma.service");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const users_model_1 = require("../users/users.model");
let AuthService = class AuthService {
    constructor(prismaService, jwtService, usersService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.usersService = usersService;
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const users = await this.prismaService.client.user.findUnique({
            where: { email }
        });
        if (!users)
            throw new common_1.NotFoundException('User not found.');
        const validatePassword = await bcrypt.compare(password, users.password);
        if (!validatePassword)
            throw new common_1.NotFoundException('Invalid password');
        const token = this.jwtService.sign({ email }, { secret: process.env.JWT_SECRET, expiresIn: '1h' });
        return { token };
    }
    async register(createDto) {
        const registerUsers = new users_model_1.User();
        registerUsers.lastname = createDto.lastname;
        registerUsers.firstname = createDto.firstname;
        registerUsers.username = createDto.username,
            registerUsers.email = createDto.email,
            registerUsers.password = await bcrypt.hash(createDto.password, 10);
        const user = await this.usersService.registerUser(registerUsers);
        const token = this.jwtService.sign({ username: user.username }, { secret: process.env.JWT_SECRET, expiresIn: '1h' });
        return { token };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        users_service_1.UsersService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map