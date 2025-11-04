import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObservacaoParticipacao } from '../database/entities/observacao-participacao.entity';
import { CreateObservacaoDto } from './dto/create-observacao.dto';

@Injectable()
export class ObservacoesService {
  constructor(
    @InjectRepository(ObservacaoParticipacao)
    private observacaoRepository: Repository<ObservacaoParticipacao>,
  ) {}

  async create(createObservacaoDto: CreateObservacaoDto, userId: string) {
    const observacao = this.observacaoRepository.create({
      ...createObservacaoDto,
      data: new Date(createObservacaoDto.data),
      autorId: userId,
    });

    await this.observacaoRepository.save(observacao);

    return this.observacaoRepository.findOne({
      where: { id: observacao.id },
      relations: ['turma', 'autor'],
      select: {
        id: true,
        turmaId: true,
        alunoId: true,
        data: true,
        criterio: true,
        notas: true,
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

  async findAll(turmaId?: string, alunoId?: string, data?: string) {
    const where: any = {};
    if (turmaId) where.turmaId = turmaId;
    if (alunoId) where.alunoId = alunoId;
    if (data) where.data = new Date(data);

    return this.observacaoRepository.find({
      where,
      relations: ['turma', 'autor'],
      select: {
        id: true,
        turmaId: true,
        alunoId: true,
        data: true,
        criterio: true,
        notas: true,
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
    const observacao = await this.observacaoRepository.findOne({
      where: { id },
      relations: ['turma', 'autor'],
      select: {
        id: true,
        turmaId: true,
        alunoId: true,
        data: true,
        criterio: true,
        notas: true,
        autorId: true,
        createdAt: true,
        autor: {
          id: true,
          nome: true,
          email: true,
        },
      },
    });

    if (!observacao) {
      throw new NotFoundException('Observação não encontrada');
    }

    return observacao;
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.observacaoRepository.delete(id);
  }
}
