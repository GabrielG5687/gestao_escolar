import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConselhoClasse } from '../database/entities/conselho-classe.entity';
import { CreateConselhoDto } from './dto/create-conselho.dto';
import { UpdateConselhoDto } from './dto/update-conselho.dto';

@Injectable()
export class ConselhosService {
  constructor(
    @InjectRepository(ConselhoClasse)
    private conselhoRepository: Repository<ConselhoClasse>,
  ) {}

  async create(createConselhoDto: CreateConselhoDto, userId: string) {
    const conselho = this.conselhoRepository.create({
      ...createConselhoDto,
      autorId: userId,
    });

    await this.conselhoRepository.save(conselho);

    return this.conselhoRepository.findOne({
      where: { id: conselho.id },
      relations: ['turma', 'autor'],
      select: {
        id: true,
        turmaId: true,
        periodoBimestre: true,
        participantes: true,
        relatorioGeral: true,
        relatoriosIndividuais: true,
        anexos: true,
        autorId: true,
        createdAt: true,
        autor: {
          id: true,
          nome: true,
          email: true,
        },
      },
    });
  }

  async findAll(turmaId?: string, periodo?: string) {
    const where: any = {};
    if (turmaId) where.turmaId = turmaId;
    if (periodo) where.periodoBimestre = periodo;

    return this.conselhoRepository.find({
      where,
      relations: ['turma', 'autor'],
      select: {
        id: true,
        turmaId: true,
        periodoBimestre: true,
        participantes: true,
        relatorioGeral: true,
        relatoriosIndividuais: true,
        anexos: true,
        autorId: true,
        createdAt: true,
        autor: {
          id: true,
          nome: true,
          email: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string) {
    const conselho = await this.conselhoRepository.findOne({
      where: { id },
      relations: ['turma', 'autor'],
      select: {
        id: true,
        turmaId: true,
        periodoBimestre: true,
        participantes: true,
        relatorioGeral: true,
        relatoriosIndividuais: true,
        anexos: true,
        autorId: true,
        createdAt: true,
        autor: {
          id: true,
          nome: true,
          email: true,
        },
      },
    });

    if (!conselho) {
      throw new NotFoundException('Conselho de classe não encontrado');
    }

    return conselho;
  }

  async update(id: string, updateConselhoDto: UpdateConselhoDto) {
    await this.findOne(id);
    await this.conselhoRepository.update(id, updateConselhoDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.conselhoRepository.delete(id);
  }
}
