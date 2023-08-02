import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsGateway } from './events/events.gateway';
import { GameService } from './game.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, EventsGateway, GameService],
})
export class AppModule {}
