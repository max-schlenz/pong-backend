import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { GameService } from 'src/game.service';
// import { Paddle } from 'src/paddle.service';

// let paddlePos = 0;

// let isMovingUp = false;
// let isMovingDown = false;
let ballPos = {x: 0, y: 0};

// let paddleAPos = {x: 0, y: 0, wid: 0, hgt: 0};
// let paddleBPos = {x: 0, y: 0, wid: 0, hgt: 0};


@WebSocketGateway()
export class EventsGateway {

	constructor(
		private gameService: GameService,
		) {
			this.startGame();
	}

    server: Server;

	gameIsRunning = false;
	players = new Map<string, string>();
	
	startGame() {
		this.gameIsRunning = true;
		// this.gameService.startGame();
		setInterval(() => {
			if (this.gameIsRunning) {
				let newBallPos = this.gameService.ball.moveBall(this.gameService.paddleA.paddleX, this.gameService.paddleA.paddleY, this.gameService.paddleA.paddleWidth, this.gameService.paddleA.paddleHeight);
				this.server.emit('ballPosition', newBallPos);
			}
		}, 15);
	}

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
		this.gameIsRunning = false;
		console.log("HERE");
		this.gameService.ball.resetBall();
		this.server.emit('ballPosition', this.gameService.ball.getBallPosition());
	  }
    
	  @SubscribeMessage('message')
    	handleMessage(client: any, payload: any): string {
        	return 'Hello world!';
    	}

		@SubscribeMessage('paddleMove')
			handlePaddleMove(client: any, data: { 
				playerId: string,
				direction: string
			}): void {
				// console.log(this.players.get(client.id));
				if (this.players.get(client.id) == "left"){
					let paddleAPos = {paddleX: 0, paddleY: 0, paddleWidth: 0, paddleHeight: 0};
					if (data.direction == "up")
						paddleAPos = this.gameService.paddleA.movePaddleUp();
					else
						paddleAPos = this.gameService.paddleA.movePaddleDown();
					this.server.emit('paddleMove', { playerId: this.players.get(client.id), newPos: paddleAPos.paddleY });
				}
				if (this.players.get(client.id) == "right"){
					let paddleBPos = {paddleX: 0, paddleY: 0, paddleWidth: 0, paddleHeight: 0};
					if (data.direction == "up")
						paddleBPos = this.gameService.paddleB.movePaddleUp();
					else
						paddleBPos = this.gameService.paddleB.movePaddleDown();
					this.server.emit('paddleMove', { playerId: this.players.get(client.id), newPos: paddleBPos.paddleY });
				}
				// else
					// this.gameService.paddleB.setPaddlePosition(data.paddleX, data.paddleY);
				// client.broadcast.emit('paddleMove', newPosition);
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