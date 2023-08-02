import { Injectable } from "@nestjs/common";

@Injectable()
export class GameService {
		// ball = {
		// 	x: 500,
		// 	y: 200,
		// 	wid: 15,
		// 	hgt: 15,
		// 	speed: 5,
		// 	dx: 4,
		// 	dy: 3
		// };
	ball: Ball;

	constructor() {
		this.ball = new Ball(500, 200, 15, 15, 5, 4, 3, 800, 600)
		this.resetGame();
	}

	private paddleLeft = { x: 1, y: 100, wid: 15, hgt: 100 };
	private paddleRight = { x: 1, y: 100, wid: 15, hgt: 100 };

	resetGame() {
		this.ball.ballX = this.ball.fieldWidth / 2 - (this.ball.ballWid / 2);
		this.ball.ballY = this.ball.fieldHeight / 2 - (this.ball.ballHgt / 2);
		this.ball.ballDx = 5;
		this.ball.ballDy = 3;
	}


	// updateGame(paddleX: number, paddleY: number, paddleWidth: number, paddleHeight: number) {
	updateGame() {
		this.ball.moveBall();
	}

	private updateBall() {
		
	}

	setPaddlePosition(playerId: string, x: number, y: number) {
		if (playerId == "left")
		{
			this.paddleLeft.x = x;
			this.paddleLeft.y = y;
		}
		else
		{
			this.paddleRight.x = x;
			this.paddleRight.y = y;
		}
	}
}

//500, 200, 15, 15, 5, 4, 3, 800, 600
export class Ball {
	constructor (
		public ballX: number = 500, 
		public ballY: number = 200, 
		public ballWid: number = 15, 
		public ballHgt: number = 15, 
		public ballSpeed: number = 5, 
		public ballDx: number = 4, 
		public ballDy: number = 3,
		public fieldWidth: number = 800,
		public fieldHeight: number = 600
	) {}

	moveBallDir(paddleX: number, paddleY: number, paddleWidth: number, paddleHeight: number): void {
		let paddleMid = paddleY + (paddleHeight / 2);
		let ballMid = this.ballY + (this.ballHgt / 2);
		let paddleHitLocation = (ballMid - paddleMid) / (paddleHeight / 2);
		let bounceAngle = (paddleHitLocation * 45) * Math.PI / 180;
			
		this.ballDx = -this.ballSpeed * Math.cos(bounceAngle);
		this.ballDy = this.ballSpeed * Math.sin(bounceAngle);
		this.ballDx = -this.ballDx;
		
		this.ballX = paddleX + paddleWidth; //fix ball sometimes glitching into paddle
		this.ballSpeed++;
	}

	// moveBall(paddleX: number, paddleY: number, paddleWidth: number, paddleHeight: number) {
	moveBall() {
		let nextBallX = this.ballX + this.ballDx;
		let nextBallY = this.ballY + this.ballDy;
  
		if ((nextBallX < 0) ) // || nextBallY + this.ballWid > this.fieldWidth)
			this.ballDx = -this.ballDx;

  
		else if (nextBallX + this.ballWid > this.fieldWidth)
		 this.ballDx = -this.ballDx;
	  
		else if (nextBallY + this.ballHgt > this.fieldHeight || nextBallY < 0)
		 this.ballDy = -this.ballDy;
	
		// else if ((nextBallX + this.ballWid >= paddleX) &&
		//   (nextBallX < paddleX + paddleWidth) &&
		//   (nextBallY + this.ballHgt >= paddleY) &&
		//   (nextBallY < paddleY + paddleHeight))
		// 	this.moveBallDir(paddleX, paddleY, paddleWidth, paddleHeight);
		
		// else {
		  this.ballX = nextBallX;
		  this.ballY = nextBallY;

		  return {
			x: this.ballX,
			y: this.ballY
		  };
		// }
		// return true;
	}
}

