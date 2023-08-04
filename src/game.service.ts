import { Injectable } from "@nestjs/common";
import { Ball } from "./ball.service";
import { Paddle } from "./paddle.service";
import { Room } from "./room.service";

@Injectable()
export class GameService {

	rooms: Map<string, Room> = new Map();

	createRoom(id: string): Room {
		const room = new Room(id);
		this.rooms.set(id, room);
		return room;
	}

	// ball: Ball;
	// paddleA: Paddle;
	// paddleB: Paddle;

	// constructor() {
	// 	this.ball = new Ball(500, 200, 15, 15, 5, 4, 3, 800, 600)
	// 	this.paddleA = new Paddle(1, 100, 15, 100, 7, 800, 600);
	// 	this.paddleB = new Paddle(785, 100, 15, 100, 7, 800, 600);
	// }

	// // updateGame() {
	// // 	this.ball.moveBall();
	// // }

	// private updateBall() {
		
	// }

}
