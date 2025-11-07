import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turma } from '../database/entities/turma.entity';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';

@Injectable()
export class TurmasService {
  constructor(
    @InjectRepository(Turma)
    private turmaRepository: Repository<Turma>,
  ) {}

  async create(createTurmaDto: CreateTurmaDto) {
    const turma = this.turmaRepository.create(createTurmaDto);
    await this.turmaRepository.save(turma);
    
    return this.turmaRepository.findOne({
      where: { id: turma.id },
      relations: ['professorResponsavel'],
      select: {
        id: true,
        nome: true,
        ano: true,
        serie: true,
        professorResponsavelId: true,
        createdAt: true,
        updatedAt: true,
        professorResponsavel: {
          id: true,
          nome: true,
          email: true,
        },
      },
    });
  }

  async findAll() {
    return this.turmaRepository.find({
      relations: ['professorResponsavel'],
      select: {
        id: true,
        nome: true,
        ano: true,
        serie: true,
        professorResponsavelId: true,
        createdAt: true,
        updatedAt: true,
        professorResponsavel: {
          id: true,
          nome: true,
          email: true,
        },
      },
    });
  }

  async findByProfessor(professorId: string) {
    return this.turmaRepository.find({
      where: { professorResponsavelId: professorId },
      select: {
        id: true,
        nome: true,
        ano: true,
        serie: true,
        professorResponsavelId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string) {
    const turma = await this.turmaRepository.findOne({
      where: { id },
      relations: ['professorResponsavel'],
      select: {
        id: true,
        nome: true,
        ano: true,
        serie: true,
        professorResponsavelId: true,
        createdAt: true,
        updatedAt: true,
        professorResponsavel: {
          id: true,
          nome: true,
          email: true,
        },
      },
    });

    if (!turma) {
      throw new NotFoundException('Turma não encontrada');
    }

    return turma;
  }

  async update(id: string, updateTurmaDto: UpdateTurmaDto) {
    await this.findOne(id);
    await this.turmaRepository.update(id, updateTurmaDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.turmaRepository.delete(id);
  }
}
