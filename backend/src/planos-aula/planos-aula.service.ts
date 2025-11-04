import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanoAula } from '../database/entities/plano-aula.entity';
import { ComentarioPlano } from '../database/entities/comentario-plano.entity';
import { Role } from '../database/entities/user.entity';
import { CreatePlanoAulaDto } from './dto/create-plano-aula.dto';
import { UpdatePlanoAulaDto } from './dto/update-plano-aula.dto';
import { CreateComentarioDto } from './dto/create-comentario.dto';

@Injectable()
export class PlanosAulaService {
  constructor(
    @InjectRepository(PlanoAula)
    private planoAulaRepository: Repository<PlanoAula>,
    @InjectRepository(ComentarioPlano)
    private comentarioRepository: Repository<ComentarioPlano>,
  ) {}

  async create(createPlanoAulaDto: CreatePlanoAulaDto, userId: string) {
    const plano = this.planoAulaRepository.create({
      ...createPlanoAulaDto,
      data: new Date(createPlanoAulaDto.data),
      autorId: userId,
    });

    await this.planoAulaRepository.save(plano);

    return this.planoAulaRepository.findOne({
      where: { id: plano.id },
      relations: ['turma', 'autor'],
      select: {
        id: true,
        turmaId: true,
        data: true,
        disciplina: true,
        tema: true,
        objetivo: true,
        recursos: true,
        atividades: true,
        avaliacaoPlaneada: true,
        observacoes: true,
        autorId: true,
        status: true,
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

  async findAll(turmaId?: string, data?: string, autorId?: string) {
    const where: any = {};
    if (turmaId) where.turmaId = turmaId;
    if (data) where.data = new Date(data);
    if (autorId) where.autorId = autorId;

    return this.planoAulaRepository.find({
      where,
      relations: ['turma', 'autor', 'comentarios', 'comentarios.autor'],
      select: {
        id: true,
        turmaId: true,
        data: true,
        disciplina: true,
        tema: true,
        objetivo: true,
        recursos: true,
        atividades: true,
        avaliacaoPlaneada: true,
        observacoes: true,
        autorId: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        autor: {
          id: true,
          nome: true,
          email: true,
        },
        comentarios: {
          id: true,
          texto: true,
          criadoEm: true,
          autor: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
      order: {
        data: 'DESC',
      },
    });
  }

  async findOne(id: string) {
    const plano = await this.planoAulaRepository.findOne({
      where: { id },
      relations: ['turma', 'autor', 'comentarios', 'comentarios.autor'],
      select: {
        id: true,
        turmaId: true,
        data: true,
        disciplina: true,
        tema: true,
        objetivo: true,
        recursos: true,
        atividades: true,
        avaliacaoPlaneada: true,
        observacoes: true,
        autorId: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        autor: {
          id: true,
          nome: true,
          email: true,
        },
        comentarios: {
          id: true,
          texto: true,
          criadoEm: true,
          autor: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
    });

    if (!plano) {
      throw new NotFoundException('Plano de aula não encontrado');
    }

    return plano;
  }

  async update(id: string, updatePlanoAulaDto: UpdatePlanoAulaDto, userId: string, userRole: Role) {
    const plano = await this.planoAulaRepository.findOne({ where: { id } });

    if (!plano) {
      throw new NotFoundException('Plano de aula não encontrado');
    }

    if (plano.autorId !== userId && userRole !== Role.ADMIN && userRole !== Role.SUPERVISOR) {
      throw new ForbiddenException('Você não tem permissão para editar este plano');
    }

    const updateData: any = { ...updatePlanoAulaDto };
    if ('data' in updatePlanoAulaDto && updatePlanoAulaDto.data) {
      updateData.data = new Date(updatePlanoAulaDto.data as string);
    }

    await this.planoAulaRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: string, userId: string, userRole: Role) {
    const plano = await this.planoAulaRepository.findOne({ where: { id } });

    if (!plano) {
      throw new NotFoundException('Plano de aula não encontrado');
    }

    if (plano.autorId !== userId && userRole !== Role.ADMIN) {
      throw new ForbiddenException('Você não tem permissão para excluir este plano');
    }

    return this.planoAulaRepository.delete(id);
  }

  async addComentario(planoId: string, createComentarioDto: CreateComentarioDto, userId: string) {
    const plano = await this.planoAulaRepository.findOne({ where: { id: planoId } });

    if (!plano) {
      throw new NotFoundException('Plano de aula não encontrado');
    }

    const comentario = this.comentarioRepository.create({
      planoAulaId: planoId,
      autorId: userId,
      texto: createComentarioDto.texto,
    });

    await this.comentarioRepository.save(comentario);

    return this.comentarioRepository.findOne({
      where: { id: comentario.id },
      relations: ['autor'],
      select: {
        id: true,
        texto: true,
        criadoEm: true,
        autor: {
          id: true,
          nome: true,
          email: true,
        },
      },
    });
  }

  async getComentarios(planoId: string) {
    const plano = await this.planoAulaRepository.findOne({ where: { id: planoId } });

    if (!plano) {
      throw new NotFoundException('Plano de aula não encontrado');
    }

    return this.comentarioRepository.find({
      where: { planoAulaId: planoId },
      relations: ['autor'],
      select: {
        id: true,
        texto: true,
        criadoEm: true,
        autor: {
          id: true,
          nome: true,
          email: true,
        },
      },
      order: {
        criadoEm: 'ASC',
      },
    });
  }
}
