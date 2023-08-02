import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from 'src/game.service';
import { Ball } from 'src/ball.service';

// let paddlePos = 0;

// let isMovingUp = false;
// let isMovingDown = false;
let ballPos = {x: 0, y: 0};

@WebSocketGateway()
export class EventsGateway {

	constructor(
		private gameService: GameService,
		private ball: Ball
		) {
		// this.gameService.startGame();
		setInterval(() => {
			let newBallPos = this.gameService.ball.moveBall();
			this.server.emit('ballPosition', newBallPos);
		}, 20);
	}

    server: Server;

	players = new Map<string, string>();
	
	afterInit(server: Server) {
		this.server = server;
		console.log('Server is ready');
	  }
	  
	  handleConnection(client: any, ...args: any[]) {
		if (!this.players.has(client.id))
		{
			if (this.players.size < 1)
			{
				this.players.set(client.id, "left");
				client.emit('direction', 'left');
			}
			else
			{
				this.players.set(client.id, "right");
				client.emit('direction', 'right');
				client.broadcast.emit('startGame');
				client.emit('startGame');
			}
		}
		console.log(`Client connected: ${client.id}`);
	  }
	
	  handleDisconnect(client: any) {
		this.players.delete(client.id);
		console.log(`Client disconnected: ${client.id}`);
	  }

	  resetGame() {
		this.ball.resetBall();
		this.server.emit('ballPosition', this.ball.getBallPosition());
	  }
    
	  @SubscribeMessage('message')
    	handleMessage(client: any, payload: any): string {
        	return 'Hello world!';
    	}

		@SubscribeMessage('paddleMove')
			handlePaddleMove(client: any, data: { 
				playerId: string,
				paddleX: number, 
				paddleY: number, 
				paddleWidth: number, 
				paddleHeight: number 
			}): void {

				this.gameService.setPaddlePosition(data.playerId, data.paddleX, data.paddleY);
				// client.broadcast.emit('paddleMove', newPosition);
				client.broadcast.emit('paddleMove', { playerId: this.players.get(client.id), newPos: data.paddleY });
				// this.gameService.updateGame(data.paddleX, data.paddleY, data.paddleWidth, data.paddleHeight);
				// console.log(this.players.get(client.id));
				// console.log(data.paddleY);
				return;
			}

		@SubscribeMessage('ballX')
    	updateBallX(client: any, ballX: number): void {
      		ballPos.x = ballX;
			client.broadcast.emit('ballX', ballPos.x);
			// console.log("X: ", ballPos.x);
    	}
		
		@SubscribeMessage('ballY')
		updateBallY(client: any, ballY: number): void {
			ballPos.y = ballY;
			client.broadcast.emit('ballY', ballPos.y);
			// console.log("Y: ", ballPos.y);
		}

		@SubscribeMessage('start')
		sendStartMessage(client: any): void {
			client.broadcast.emit('startGame');
			console.log("start");
			// console.log("Y: ", ballPos.y);
		}
		// @SubscribeMessage('paddleBMove')
		// 	handlePaddleBMove(client: any, newPosition: number): void {
		// 		client.broadcast.emit('paddleBMove', newPosition);
		// 		return;
		// 	}
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