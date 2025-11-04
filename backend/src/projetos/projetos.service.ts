import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjetoSala } from '../database/entities/projeto-sala.entity';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';

@Injectable()
export class ProjetosService {
  constructor(
    @InjectRepository(ProjetoSala)
    private projetoRepository: Repository<ProjetoSala>,
  ) { }

  async create(createProjetoDto: CreateProjetoDto, userId: string) {
    const projeto = this.projetoRepository.create({
      ...createProjetoDto,
      dataInicio: new Date(createProjetoDto.dataInicio),
      dataFim: createProjetoDto.dataFim ? new Date(createProjetoDto.dataFim) : null,
      responsavelId: userId,
    });

    await this.projetoRepository.save(projeto);

    return this.projetoRepository.findOne({
      where: { id: projeto.id },
      relations: ['turma', 'responsavel'],
      select: {
        id: true,
        titulo: true,
        descricao: true,
        turmaId: true,
        responsavelId: true,
        dataInicio: true,
        dataFim: true,
        anexos: true,
        createdAt: true,
        responsavel: {
          id: true,
          nome: true,
          email: true,
        },
      },
    });
  }

  async findAll(turmaId?: string) {
    const where: any = {};
    if (turmaId) where.turmaId = turmaId;

    return this.projetoRepository.find({
      where,
      relations: ['turma', 'responsavel'],
      select: {
        id: true,
        titulo: true,
        descricao: true,
        turmaId: true,
        responsavelId: true,
        dataInicio: true,
        dataFim: true,
        anexos: true,
        createdAt: true,
        responsavel: {
          id: true,
          nome: true,
          email: true,
        },
      },
      order: {
        dataInicio: 'DESC',
      },
    });
  }

  async findOne(id: string) {
    const projeto = await this.projetoRepository.findOne({
      where: { id },
      relations: ['turma', 'responsavel'],
      select: {
        id: true,
        titulo: true,
        descricao: true,
        turmaId: true,
        responsavelId: true,
        dataInicio: true,
        dataFim: true,
        anexos: true,
        createdAt: true,
        responsavel: {
          id: true,
          nome: true,
          email: true,
        },
      },
    });

    if (!projeto) {
      throw new NotFoundException('Projeto não encontrado');
    }

    return projeto;
  }

  async update(id: string, updateProjetoDto: UpdateProjetoDto) {
    await this.findOne(id);

    const updateData: any = { ...updateProjetoDto };
    if ('dataInicio' in updateProjetoDto && updateProjetoDto.dataInicio) {
      updateData.dataInicio = new Date(updateProjetoDto.dataInicio as string);
    }
    if ('dataFim' in updateProjetoDto && updateProjetoDto.dataFim) {
      updateData.dataFim = new Date(updateProjetoDto.dataFim as string);
    }

    await this.projetoRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.projetoRepository.delete(id);
  }
}
