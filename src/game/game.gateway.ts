import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class GameGateway {
	@WebSocketServer()
	server: Server;

	private ball = {
		x: 400,
		y: 200,
		wid: 15,
		hgt: 15,
		speed: 5,
		dx: 4,
		dy: 3,
		fieldWidth: 800,
		fieldHeight: 600,
		paddleX: 0,
		paddleY: 0,
		paddleWidth: 15,
		paddleHeight: 120
	};

	@SubscribeMessage('ballMove')
	handleBallMove(client: any, data: any)
	{
		let nextBallX = this.ball.x + this.ball.dx;
		let nextBallY = this.ball.y + this.ball.dy;
  
		if ((nextBallX < 0) ) // || nextBallY + this.ball.wid > this.ball.fieldWidth)
		  return false;
  
		else if (nextBallX + this.ball.wid > this.ball.fieldWidth)
		 this.ball.dx = -this.ball.dx;
	  
		else if (nextBallY + this.ball.hgt > this.ball.fieldHeight || nextBallY < 0)
		 this.ball.dy = -this.ball.dy;
	
		else if ((nextBallX + this.ball.wid >= this.ball.paddleX) &&
		  (nextBallX < this.ball.paddleX + this.ball.paddleWidth) &&
		  (nextBallY + this.ball.hgt >= this.ball.paddleY) &&
		  (nextBallY < this.ball.paddleY + this.ball.paddleHeight)){
			let paddleMid = data.paddleY + (data.paddleHeight / 2);
			let ballMid = this.ball.y + (this.ball.hgt / 2);
			let paddleHitLocation = (ballMid - paddleMid) / (data.paddleHeight / 2);
			let bounceAngle = (paddleHitLocation * 45) * Math.PI / 180;
			  
			this.ball.dx = -this.ball.speed * Math.cos(bounceAngle);
			this.ball.dy = this.ball.speed * Math.sin(bounceAngle);
			this.ball.dx = -this.ball.dx;
			
			this.ball.x = data.paddleX + data.paddleWidth; //fix ball sometimes glitching into paddle
			this.ball.speed++;
	
			this.server.emit('ballUpdate', {
				dx: this.ball.dx,
				dy: this.ball.dy,
				x: this.ball.x,
				y: this.ball.y,
				speed: this.ball.speed
			});
		  }
		
		else {
			this.ball.x = nextBallX;
			this.ball.y = nextBallY;
			this.server.emit('ballUpdate', {
				dx: this.ball.dx,
				dy: this.ball.dy,
				x: this.ball.x,
				y: this.ball.y,
				speed: this.ball.speed
			});
		}
		return true;
	}
}
