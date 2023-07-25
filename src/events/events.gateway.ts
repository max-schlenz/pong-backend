import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// let paddlePos = 0;

// let isMovingUp = false;
// let isMovingDown = false;
// let ballPos = {x: 0, y: 0};

@WebSocketGateway()
export class EventsGateway {

    server: Server;
	
	afterInit(server: Server) {
		this.server = server;
		console.log('Server is ready');
	  }
	  
	  handleConnection(client: Socket, ...args: any[]) {
		console.log(`Client connected: ${client.id}`);
	  }
	
	  handleDisconnect(client: Socket) {
		console.log(`Client disconnected: ${client.id}`);
	  }
    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): string {
        return 'Hello world!';
    }

	@SubscribeMessage('paddleAMove')
	handlePaddleAMove(client: any, newPosition: number): void {
		client.broadcast.emit('paddleAMove', newPosition);
		return;
	}

	@SubscribeMessage('paddleBMove')
	handlePaddleBMove(client: any, newPosition: number): void {
		client.broadcast.emit('paddleBMove', newPosition);
		return;
	}
}
    // @SubscribeMessage('moveUp')
    // updateMoveUp(client: any, moveUp: boolean): void {
	// 	client.emit('moveUp', true);
	// 	client.emit('moveDown', false);
    // //   console.log("Paddle: ", paddleY);
    // }
	
    // @SubscribeMessage('moveDown')
    // updateMoveDown(client: any, moveUp: boolean): void {
	// 	client.emit('moveUp', false);
	// 	client.emit('moveDown', true);
    //   console.log("Paddle: ", paddleY);
    // @SubscribeMessage('paddleY')
    // updatePaddleY(client: any, paddleY: number): void {
    //   paddlePos = paddleY;
	//   client.emit('ballPosResponse', paddlePos);
    // //   console.log("Paddle: ", paddleY);
    // }

    // @SubscribeMessage('ballX')
    // updateBallX(client: any, ballX: number): void {
    //   ballPos.x = ballX;
    //   console.log("X: ", ballPos.x);
    // }
    
    // @SubscribeMessage('ballY')
    // updateBallY(client: any, ballY: number): void {
    //   ballPos.y = ballY;
    //   console.log("Y: ", ballPos.y);
    // }