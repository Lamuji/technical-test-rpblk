// tweets.gateway.ts
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class PostGateway {
  @WebSocketServer()
  server: Server;

  sendPost(tweet: any) {
    this.server.emit('post', tweet);
  }
}