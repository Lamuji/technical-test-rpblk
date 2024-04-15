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
exports.EventsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const users_service_1 = require("./users/users.service");
let EventsGateway = class EventsGateway {
    constructor(userService) {
        this.userService = userService;
    }
    handleConnection(client, ...args) {
        console.log(`Client connected -------------------------------------------------: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected------------------------------------------------: ${client.id}`);
    }
    async handleLikePost(data, client) {
        await this.userService.updateLike(data.postId, data.increment);
        const updatedPost = await this.userService.getPostById(data.postId);
        this.server.emit('postUpdated', updatedPost);
    }
    async handleDislikePost(data, client) {
        await this.userService.updateDislike(data.postId, data.increment);
        const updatedPost = await this.userService.getPostById(data.postId);
        this.server.emit('postUpdated', updatedPost);
    }
    async handleNewPost(data, client) {
        console.log("new post:", data);
        const newPost = await this.userService.createPost(data);
        this.server.emit('newPost', newPost);
    }
    async getPosts(client) {
        this.userService.getAllPosts().then(posts => {
            this.server.emit('getPosts', posts);
        });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], EventsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('likePost'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], EventsGateway.prototype, "handleLikePost", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('dislikePost'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], EventsGateway.prototype, "handleDislikePost", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('newPost'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], EventsGateway.prototype, "handleNewPost", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getPosts'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], EventsGateway.prototype, "getPosts", null);
EventsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        }
    }),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], EventsGateway);
exports.EventsGateway = EventsGateway;
//# sourceMappingURL=events.gateway.js.map