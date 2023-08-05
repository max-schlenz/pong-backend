import { Injectable } from "@nestjs/common";

//500, 200, 15, 15, 5, 4, 3, 800, 600
@Injectable()
export class Ball {
	
	constructor (
		public ballX: number = 500, 
		public ballY: number = 200, 
		public ballWid: number = 15, 
		public ballHgt: number = 15, 
		public ballSpeed: number = 2, 
		public ballDx: number = 4, 
		public ballDy: number = 3,
		public fieldWidth: number = 800,
		public fieldHeight: number = 600,
		) {	}
		
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
			this.ballSpeed = 3;
		}
		
		moveBallDir(paddleBY: number, paddleHeight: number, paddle: string): void {
			let paddleMid = paddleBY + (paddleHeight / 2);
			let ballMid = this.ballY + (this.ballHgt / 2);
			let paddleHitLocation = (ballMid - paddleMid) / (paddleHeight / 2);
			let bounceAngle = (paddleHitLocation * 45) * Math.PI / 180;
			
			if (paddle == "A")
				this.ballDx = -this.ballSpeed * Math.cos(bounceAngle);
			else
				this.ballDx = this.ballSpeed * Math.cos(bounceAngle);
				this.ballDy = this.ballSpeed * Math.sin(bounceAngle);
				this.ballDx = -this.ballDx;
			
			this.ballSpeed++;
		}
		
		handleBallCollision(nextBallX: number, nextBallY: number, paddleX: number, paddleY: number, paddleWidth: number, paddleHeight: number, paddle: string) {
			if (paddle == "A"){
				if ((nextBallX < paddleX + paddleWidth) &&
				(nextBallY + this.ballHgt >= paddleY) &&
				(nextBallY < paddleY + paddleHeight))
					return true;
				return false;
			}
			else {
				if ((nextBallX + this.ballWid >= paddleX) && 
				(nextBallY <= paddleY + paddleHeight) &&
				(nextBallY + this.ballHgt >= paddleY))
					return true;
				return false;
			}
		}

		moveBall(paddleAX: number, paddleAY: number, paddleBX: number, paddleBY: number, paddleWidth: number, paddleHeight: number) {
			let nextBallX = this.ballX + this.ballDx;
			let nextBallY = this.ballY + this.ballDy;
			
			if (((nextBallX <= 0) && nextBallX < this.ballX) || (nextBallX + this.ballWid > this.fieldWidth && nextBallX > this.ballX))
				this.resetBall();
			
			else if (nextBallX + this.ballWid > this.fieldWidth)
				this.ballDx = -this.ballDx;
			
			else if (nextBallY + this.ballHgt > this.fieldHeight || nextBallY < 0)
				this.ballDy = -this.ballDy;
			
			else if (this.handleBallCollision(nextBallX, nextBallY, paddleAX, paddleAY, paddleWidth, paddleHeight, "A")){
				this.moveBallDir(paddleAY, paddleHeight, "A");
				this.ballX = paddleAX + paddleWidth;
			}
			
			else if (this.handleBallCollision(nextBallX, nextBallY, paddleBX, paddleBY, paddleWidth, paddleHeight, "B")){
				this.moveBallDir(paddleBY, paddleHeight, "B");
				this.ballX = paddleBX - this.ballWid;
			}
			else {
				this.ballX = nextBallX;
				this.ballY = nextBallY;
			}
			
			return {
				x: this.ballX,
				y: this.ballY
			};
		}
	}
	
