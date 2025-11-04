import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AtaOcorrencia } from '../database/entities/ata-ocorrencia.entity';
import { CreateAtaDto } from './dto/create-ata.dto';
import { UpdateAtaDto } from './dto/update-ata.dto';

@Injectable()
export class AtasService {
  constructor(
    @InjectRepository(AtaOcorrencia)
    private ataRepository: Repository<AtaOcorrencia>,
  ) {}

  async create(createAtaDto: CreateAtaDto, userId: string) {
    const ata = this.ataRepository.create({
      ...createAtaDto,
      data: new Date(createAtaDto.data),
      autorId: userId,
    });

    await this.ataRepository.save(ata);

    return this.ataRepository.findOne({
      where: { id: ata.id },
      relations: ['turma', 'autor'],
      select: {
        id: true,
        turmaId: true,
        data: true,
        titulo: true,
        descricao: true,
        medidasTomadas: true,
        autorId: true,
        anexos: true,
        createdAt: true,
        autor: {
          id: true,
          nome: true,
          email: true,
        },
      },
    });
  }

  async findAll(turmaId?: string, data?: string) {
    const where: any = {};
    if (turmaId) where.turmaId = turmaId;
    if (data) where.data = new Date(data);

    return this.ataRepository.find({
      where,
      relations: ['turma', 'autor'],
      select: {
        id: true,
        turmaId: true,
        data: true,
        titulo: true,
        descricao: true,
        medidasTomadas: true,
        autorId: true,
        anexos: true,
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
    const ata = await this.ataRepository.findOne({
      where: { id },
      relations: ['turma', 'autor'],
      select: {
        id: true,
        turmaId: true,
        data: true,
        titulo: true,
        descricao: true,
        medidasTomadas: true,
        autorId: true,
        anexos: true,
        createdAt: true,
        autor: {
          id: true,
          nome: true,
          email: true,
        },
      },
    });

    if (!ata) {
      throw new NotFoundException('Ata não encontrada');
    }

    return ata;
  }

  async update(id: string, updateAtaDto: UpdateAtaDto) {
    await this.findOne(id);
    
    const updateData: any = { ...updateAtaDto };
    if ('data' in updateAtaDto && updateAtaDto.data) {
      updateData.data = new Date(updateAtaDto.data as string);
    }

    await this.ataRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.ataRepository.delete(id);
  }
}
