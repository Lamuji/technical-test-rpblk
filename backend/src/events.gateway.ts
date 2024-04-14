import { WebSocketGateway, SubscribeMessage, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UsersService } from './users/users.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})

export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    constructor(private userService: UsersService) {}

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client connected: ${client.id}`);
        this.userService.getAllPosts().then(posts => {
            client.emit('allPosts', posts);  // Send all posts to the newly connected client
        });
    }
    
    @SubscribeMessage('createPost')
    async handleCreatePost(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        const newPost = await this.userService.createPost(data);
        this.server.emit('postCreated', newPost);  // Broadcast the new post to all clients
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('likePost')
    async handleLikePost(@MessageBody() data: { postId: number, increment: boolean }, @ConnectedSocket() client: Socket) {
        await this.userService.updateLike(data.postId, data.increment);
        const updatedPost = await this.userService.getPostById(data.postId);
        this.server.emit('postUpdated', updatedPost);
    }

    @SubscribeMessage('dislikePost')
    async handleDislikePost(@MessageBody() data: { postId: number, increment: boolean }, @ConnectedSocket() client: Socket) {
        await this.userService.updateDislike(data.postId, data.increment);
        const updatedPost = await this.userService.getPostById(data.postId);
        this.server.emit('postUpdated', updatedPost);
    }

    @SubscribeMessage('newPost')
    async handleNewPost(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        const newPost = await this.userService.createPost(data);
        this.server.emit('newPost', newPost);  // Emit the new post to all connected clients
    }
}
