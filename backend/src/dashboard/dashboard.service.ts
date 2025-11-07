import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turma } from '../database/entities/turma.entity';
import { PlanoAula } from '../database/entities/plano-aula.entity';
import { ObservacaoParticipacao } from '../database/entities/observacao-participacao.entity';
import { ProjetoSala } from '../database/entities/projeto-sala.entity';
import { User } from '../database/entities/user.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Turma)
    private turmaRepository: Repository<Turma>,
    @InjectRepository(PlanoAula)
    private planoAulaRepository: Repository<PlanoAula>,
    @InjectRepository(ObservacaoParticipacao)
    private observacaoRepository: Repository<ObservacaoParticipacao>,
    @InjectRepository(ProjetoSala)
    private projetoRepository: Repository<ProjetoSala>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getStatsSupervisor() {
    const [
      totalTurmas,
      planosPendentes,
      totalObservacoes,
      projetosAtivos,
      totalProfessores,
      totalAlunos,
    ] = await Promise.all([
      this.turmaRepository.count(),
      this.planoAulaRepository.count({
        where: { status: 'RASCUNHO' as any },
      }),
      this.observacaoRepository.count(),
      this.projetoRepository.count(),
      this.userRepository.count({
        where: { role: 'PROFESSOR' as any },
      }),
      this.userRepository.count({
        where: { role: 'ALUNO' as any },
      }),
    ]);

    return {
      totalTurmas,
      planosPendentes,
      totalObservacoes,
      projetosAtivos,
      totalProfessores,
      totalAlunos,
    };
  }

  async getStatsProfessor(userId: string) {
    const [
      minhasTurmas,
      meusPlanos,
      minhasObservacoes,
      meusProjetos,
      planosPublicados,
      planosRascunho,
    ] = await Promise.all([
      this.turmaRepository.count({
        where: { professorResponsavelId: userId },
      }),
      this.planoAulaRepository.count({
        where: { autorId: userId },
      }),
      this.observacaoRepository.count({
        where: { autorId: userId },
      }),
      this.projetoRepository.count({
        where: { responsavelId: userId },
      }),
      this.planoAulaRepository.count({
        where: { autorId: userId, status: 'PUBLICADO' as any },
      }),
      this.planoAulaRepository.count({
        where: { autorId: userId, status: 'RASCUNHO' as any },
      }),
    ]);

    return {
      minhasTurmas,
      meusPlanos,
      minhasObservacoes,
      meusProjetos,
      planosAprovados: planosPublicados,
      planosPendentes: planosRascunho,
    };
  }

  async getPlanosRecentes(userId: string, limit: number = 5) {
    return this.planoAulaRepository.find({
      where: { autorId: userId },
      order: { createdAt: 'DESC' },
      take: limit,
      relations: ['turma'],
    });
  }

  async getPlanosPendentesRevisao(limit: number = 10) {
    return this.planoAulaRepository.find({
      where: { status: 'RASCUNHO' as any },
      order: { createdAt: 'DESC' },
      take: limit,
      relations: ['turma', 'autor'],
    });
  }

  async getAtividadesRecentes(limit: number = 10) {
    // Buscar últimas observações e projetos
    const [observacoes, projetos] = await Promise.all([
      this.observacaoRepository.find({
        order: { createdAt: 'DESC' },
        take: limit,
        relations: ['turma'],
      }),
      this.projetoRepository.find({
        order: { createdAt: 'DESC' },
        take: limit,
        relations: ['turma', 'responsavel'],
      }),
    ]);

    // Combinar e ordenar por data
    const atividades = [
      ...observacoes.map((obs) => ({
        id: obs.id,
        tipo: 'observacao',
        titulo: `Observação - ${obs.criterio}`,
        descricao: obs.notas.substring(0, 100),
        data: obs.createdAt,
        turma: obs.turma?.nome,
      })),
      ...projetos.map((proj) => ({
        id: proj.id,
        tipo: 'projeto',
        titulo: proj.titulo,
        descricao: proj.descricao.substring(0, 100),
        data: proj.createdAt,
        turma: proj.turma?.nome,
      })),
    ]
      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
      .slice(0, limit);

    return atividades;
  }

  async getProjetosAtivos(userId?: string) {
    const where = userId ? { responsavelId: userId } : {};
    
    return this.projetoRepository.find({
      where,
      order: { dataInicio: 'DESC' },
      take: 5,
      relations: ['turma', 'responsavel'],
    });
  }
}
