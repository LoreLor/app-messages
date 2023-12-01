import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message-dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Post()
    async create(@Body() createMessageDto: CreateMessageDto) {
        try {
            await this.messagesService.createMessage(createMessageDto);
            return {
                msg: 'Message created successfully',
                newMessage: createMessageDto,
            };
        } catch (error) {
            throw new NotFoundException(
                `Ooops error in createmessage: ${error.message}`,
            );
        }
    }

    @Get()
    async allMessages() {
        try {
            return await this.messagesService.getAllMessage();
        } catch (error) {
            throw new NotFoundException(
                `Ooops error in allMessage: ${error.message}`,
            );
        }
    }

    @Put(':id') // tambien puede ser con patch
    async update(
        @Param('id') id: number,
        @Body() createMessageDto: CreateMessageDto,
    ) {
        try {
            await this.messagesService.updatedMessage(id, createMessageDto);
            return {
                msg: 'Message updated successfully',
                newMessage: createMessageDto,
            };
        } catch (error) {
            throw new NotFoundException(
                `Ooops error in updateMessage: ${error.message}`,
            );
        }
    }

    @Delete(':id')
    async removeMessage(@Param('id') id: number) {
        try {
            await this.messagesService.deleteMessage(id);
            return `Message was removed successfully`;
        } catch (error) {
            throw new NotFoundException(
                `Ooops error in deleteMessage: ${error.message}`,
            );
        }
    }
}
