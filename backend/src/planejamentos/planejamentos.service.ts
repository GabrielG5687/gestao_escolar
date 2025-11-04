import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanejamentoAnual } from '../database/entities/planejamento-anual.entity';
import { CreatePlanejamentoDto } from './dto/create-planejamento.dto';
import { UpdatePlanejamentoDto } from './dto/update-planejamento.dto';

@Injectable()
export class PlanejamentosService {
  constructor(
    @InjectRepository(PlanejamentoAnual)
    private planejamentoRepository: Repository<PlanejamentoAnual>,
  ) {}

  async create(createPlanejamentoDto: CreatePlanejamentoDto, userId: string) {
    const planejamento = this.planejamentoRepository.create({
      ...createPlanejamentoDto,
      autorId: userId,
    });
    
    await this.planejamentoRepository.save(planejamento);
    
    return this.planejamentoRepository.findOne({
      where: { id: planejamento.id },
      relations: ['turma', 'autor'],
      select: {
        id: true,
        escolaId: true,
        turmaId: true,
        anoLetivo: true,
        descricao: true,
        autorId: true,
        periodo: true,
        createdAt: true,
        updatedAt: true,
        autor: {
          id: true,
          nome: true,
          email: true,
        },
      },
    });
  }

  async findAll(ano?: number, turmaId?: string) {
    const where: any = {};
    if (ano) where.anoLetivo = ano;
    if (turmaId) where.turmaId = turmaId;

    return this.planejamentoRepository.find({
      where,
      relations: ['turma', 'autor'],
      select: {
        id: true,
        escolaId: true,
        turmaId: true,
        anoLetivo: true,
        descricao: true,
        autorId: true,
        periodo: true,
        createdAt: true,
        updatedAt: true,
        autor: {
          id: true,
          nome: true,
          email: true,
        },
      },
      order: {
        anoLetivo: 'DESC',
      },
    });
  }

  async findOne(id: string) {
    const planejamento = await this.planejamentoRepository.findOne({
      where: { id },
      relations: ['turma', 'autor'],
      select: {
        id: true,
        escolaId: true,
        turmaId: true,
        anoLetivo: true,
        descricao: true,
        autorId: true,
        periodo: true,
        createdAt: true,
        updatedAt: true,
        autor: {
          id: true,
          nome: true,
          email: true,
        },
      },
    });

    if (!planejamento) {
      throw new NotFoundException('Planejamento não encontrado');
    }

    return planejamento;
  }

  async update(id: string, updatePlanejamentoDto: UpdatePlanejamentoDto) {
    await this.findOne(id);
    await this.planejamentoRepository.update(id, updatePlanejamentoDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.planejamentoRepository.delete(id);
  }
}
