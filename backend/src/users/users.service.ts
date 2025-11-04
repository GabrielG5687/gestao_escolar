import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.senha, 12);
    
    const user = this.userRepository.create({
      ...createUserDto,
      senha: hashedPassword,
    });

    await this.userRepository.save(user);

    const { senha, ...result } = user;
    return result;
  }

  async findAll() {
    const users = await this.userRepository.find({
      select: ['id', 'nome', 'email', 'role', 'createdAt'],
    });
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'nome', 'email', 'role', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.userRepository.delete(id);
  }

  async findProfessores() {
    return this.userRepository.find({
      where: { role: 'PROFESSOR' as any },
      select: ['id', 'nome', 'email'],
      order: { nome: 'ASC' },
    });
  }
}
