import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UsersService } from './users/users.service';
export declare class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private userService;
    server: Server;
    constructor(userService: UsersService);
    handleConnection(client: Socket, ...args: any[]): void;
    handleCreatePost(data: any, client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleLikePost(data: {
        postId: number;
        increment: boolean;
    }, client: Socket): Promise<void>;
    handleDislikePost(data: {
        postId: number;
        increment: boolean;
    }, client: Socket): Promise<void>;
    handleNewPost(data: any, client: Socket): Promise<void>;
}
