import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entity/message';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message-dto';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
    ) {}

    async getAllMessage(): Promise<Message[]> {
        return await this.messageRepository.find();
    }

    async createMessage(newMessage: CreateMessageDto): Promise<Message> {
        const message = new Message();
        message.message = newMessage.message;
        message.nick = newMessage.nick;

        return this.messageRepository.save(message);
    }

    async updatedMessage(
        id: number,
        updatedMessage: CreateMessageDto,
    ): Promise<Message> {
        const messageUpdate = await this.messageRepository.findOne({
            where: {
                id: id,
            },
        });
        if (!messageUpdate) {
            throw new NotFoundException(`Message whit ID: ${id} is not found`);
        }
        messageUpdate.nick = updatedMessage.nick;
        messageUpdate.message = updatedMessage.message;

        return this.messageRepository.save(messageUpdate);
    }

    async deleteMessage(id: number): Promise<any> {
        const message = await this.messageRepository.findOne({
            where: {
                id: id,
            },
        });

        if (!message) {
            throw new NotFoundException(`Message is not exist`);
        }

        return await this.messageRepository.remove(message);
    }
}
