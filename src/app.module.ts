import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesController } from './messages/messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Message } from './messages/entity/message';
import { MessagesService } from './messages/messages.service';

@Module({
    imports: [
        // conecta y crea entidades en base de datos
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'CasaS_018',
            database: 'nest_messages',
            entities: [Message],
            synchronize: true,
        }),
        // para inyectar en todos los modulos la entidad message
        TypeOrmModule.forFeature([Message]),
        ConfigModule.forRoot(),
    ],
    controllers: [AppController, MessagesController],
    providers: [AppService, MessagesService],
})
export class AppModule {}
