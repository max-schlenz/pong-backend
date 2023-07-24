import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

let paddlePos = 0;
let ballPos = {x: 0, y: 0};

@WebSocketGateway()
export class EventsGateway {


    @WebSocketServer() 
    server: Server;

    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): string {
        return 'Hello world!';
    }
    
    @SubscribeMessage('paddleY')
    updatePaddleY(client: any, paddleY: number): void {
      paddlePos = paddleY;
      console.log("Paddle: ", paddleY);
    }

    @SubscribeMessage('ballX')
    updateBallX(client: any, ballX: number): void {
      ballPos.x = ballX;
      console.log("X: ", ballPos.x);
    }
    
    @SubscribeMessage('ballY')
    updateBallY(client: any, ballY: number): void {
      ballPos.y = ballY;
      console.log("Y: ", ballPos.y);
    }

}
