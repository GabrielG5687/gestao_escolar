import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NeeAtividade } from '../database/entities/nee-atividade.entity';
import { CreateNeeDto } from './dto/create-nee.dto';
import { UpdateNeeDto } from './dto/update-nee.dto';

@Injectable()
export class NeeService {
  constructor(
    @InjectRepository(NeeAtividade)
    private neeRepository: Repository<NeeAtividade>,
  ) {}

  async create(createNeeDto: CreateNeeDto, userId: string) {
    const nee = this.neeRepository.create({
      ...createNeeDto,
      data: new Date(createNeeDto.data),
      autorId: userId,
    });

    await this.neeRepository.save(nee);

    return this.neeRepository.findOne({
      where: { id: nee.id },
      relations: ['turma', 'autor'],
      select: {
        id: true,
        turmaId: true,
        alunoId: true,
        data: true,
        descricaoAtividade: true,
        adaptacoes: true,
        resultadoObservado: true,
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

  async findAll(alunoId?: string, turmaId?: string) {
    const where: any = {};
    if (alunoId) where.alunoId = alunoId;
    if (turmaId) where.turmaId = turmaId;

    return this.neeRepository.find({
      where,
      relations: ['turma', 'autor'],
      select: {
        id: true,
        turmaId: true,
        alunoId: true,
        data: true,
        descricaoAtividade: true,
        adaptacoes: true,
        resultadoObservado: true,
        autorId: true,
        createdAt: true,
        autor: {
          id: true,
          nome: true,
          email: true,
        },
      },
      order: {
        data: 'DESC',
      },
    });
  }

  async findOne(id: string) {
    const nee = await this.neeRepository.findOne({
      where: { id },
      relations: ['turma', 'autor'],
      select: {
        id: true,
        turmaId: true,
        alunoId: true,
        data: true,
        descricaoAtividade: true,
        adaptacoes: true,
        resultadoObservado: true,
        autorId: true,
        createdAt: true,
        autor: {
          id: true,
          nome: true,
          email: true,
        },
      },
    });

    if (!nee) {
      throw new NotFoundException('Atividade NEE não encontrada');
    }

    return nee;
  }

  async update(id: string, updateNeeDto: UpdateNeeDto) {
    await this.findOne(id);
    
    const updateData: any = { ...updateNeeDto };
    if ('data' in updateNeeDto && updateNeeDto.data) {
      updateData.data = new Date(updateNeeDto.data as string);
    }

    await this.neeRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.neeRepository.delete(id);
  }
}
