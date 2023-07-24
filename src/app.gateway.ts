import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
	cors: {
	  origin: 'http://localhost:8080',
	  credentials: true,
	  handlePreflightRequest: (req, res) => {
		res.writeHead(200, {
		  'Access-Control-Allow-Origin': 'http://localhost:8080',
		  'Access-Control-Allow-Methods': 'GET,POST',
		  'Access-Control-Allow-Credentials': true
		});
		res.end();
	  }
	}
  })  
export class AppGateway implements OnGatewayInit {
  
  private server: Server;

  afterInit(server: Server) {
    this.server = server;
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): WsResponse<string> {
    console.log('Received message: ', payload);
    return { event: 'message', data: 'Hello from NestJS!' };
  }
}
