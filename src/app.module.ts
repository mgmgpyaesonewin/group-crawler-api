import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IndustriesModule } from './industries/industries.module';

@Module({
  imports: [
    IndustriesModule,
    MongooseModule.forRoot('mongodb://localhost/bindez'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
