import { Injectable } from "@nestjs/common";
import { Ball } from "./ball.service";
import { Paddle } from "./paddle.service";

@Injectable()
export class GameService {

	ball: Ball;
	paddleA: Paddle;
	paddleB: Paddle;

	constructor() {
		this.ball = new Ball(500, 200, 15, 15, 5, 4, 3, 800, 600)
		this.paddleA = new Paddle(1, 100, 15, 100, 7, 800, 600);
		this.paddleB = new Paddle(785, 100, 15, 100, 7, 800, 600);
	}

	// updateGame() {
	// 	this.ball.moveBall();
	// }

	private updateBall() {
		
	}

}
