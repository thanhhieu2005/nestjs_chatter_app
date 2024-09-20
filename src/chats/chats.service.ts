import { Injectable } from '@nestjs/common';
import { ChatsRepository } from './chats.repository';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';

@Injectable()
export class ChatsService {
  constructor(private readonly chatsRepository: ChatsRepository) {}

  create(createChatInput: CreateChatInput, userId: string) {
    return this.chatsRepository.create({
      ...createChatInput,
      userId,
      userIds: createChatInput.userIds || [],
    });
  }

  async findAll() {
    return this.chatsRepository.find({});
  }

  async findOne(_id: string) {
    return this.chatsRepository.findOne({ _id });
  }

  update(id: number, updateChatInput: UpdateChatInput) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
