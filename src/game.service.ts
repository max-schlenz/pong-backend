import { Injectable } from "@nestjs/common";
import { Ball } from "./ball.service";

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
	}

	private paddleLeft = { x: 1, y: 100, wid: 15, hgt: 100 };
	private paddleRight = { x: 1, y: 100, wid: 15, hgt: 100 };


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
