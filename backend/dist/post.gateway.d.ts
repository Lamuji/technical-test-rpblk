import { Server } from 'socket.io';
export declare class PostGateway {
    server: Server;
    sendPost(tweet: any): void;
}
