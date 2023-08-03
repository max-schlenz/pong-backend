import { Injectable } from "@nestjs/common";

@Injectable()
export class Paddle{
	constructor(
		public paddleX: number = 1,
		public paddleY: number = 100,
		public paddleWidth: number = 15,
		public paddleHeight: number = 100,
		public paddleSpeed: number = 7,
		public fieldWidth: number = 800,
		public fieldHeight: number = 600
  ) {}

	movePaddleUp() {
		if (this.paddleY > this.paddleSpeed)
			this.paddleY -= this.paddleSpeed;
		else
			this.paddleY = 0;

		let data = {
			paddleX: this.paddleX,
			paddleY: this.paddleY,
			paddleWidth: this.paddleWidth,
			paddleHeight: this.paddleHeight
		};
		return data;
	}

	movePaddleDown() {
		if (this.paddleY >= (this.fieldHeight - this.paddleHeight - 1))
			this.paddleY= this.fieldHeight - this.paddleHeight;
		else
			this.paddleY += this.paddleSpeed;

		let data = {
			paddleX: this.paddleX,
			paddleY: this.paddleY,
			paddleWidth: this.paddleWidth,
			paddleHeight: this.paddleHeight
		};
		return data;
	}

	
	setPaddlePosition(x: number, y: number) {
			this.paddleX = x;
			this.paddleY = y;
	}
}