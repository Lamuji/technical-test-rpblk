"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const auth_service_1 = require("./auth/auth.service");
const users_module_1 = require("./users/users.module");
const prisma_service_1 = require("./prisma.service");
const users_service_1 = require("./users/users.service");
const jwt_1 = require("@nestjs/jwt");
const events_gateway_1 = require("./events.gateway");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule, auth_module_1.AuthModule],
        controllers: [],
        providers: [prisma_service_1.PrismaService, auth_service_1.AuthService, users_service_1.UsersService, jwt_1.JwtService, events_gateway_1.EventsGateway],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map