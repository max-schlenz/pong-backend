import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsGateway } from './events/events.gateway';
import { GameService } from './game.service';
import { Ball } from './ball.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
		AppService,
		EventsGateway,
		GameService,
		{ 
			provide: Ball,
			useFactory: () => {
				return new Ball()
			}
		}
	],
})
export class AppModule {}
