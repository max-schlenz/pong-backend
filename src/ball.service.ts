import { Injectable } from "@nestjs/common";


//500, 200, 15, 15, 5, 4, 3, 800, 600
@Injectable()
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

	getBallPosition() {
		return {
			x: this.ballX,
			y: this.ballY
		};
	}

	resetBall() {
		this.ballX = this.fieldWidth / 2 - (this.ballWid / 2);
		this.ballY = this.fieldHeight / 2 - (this.ballHgt / 2);
		this.ballDx = 5;
		this.ballDy = 3;
		console.log("RESET");
	}

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
			this.resetBall();
			// this.ballDx = -this.ballDx;

  
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

