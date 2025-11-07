import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanejamentoBimestral } from '../database/entities/planejamento-bimestral.entity';
import { AnexoPlanoAula } from '../database/entities/anexo-plano-aula.entity';
import { AtividadeAdaptada } from '../database/entities/atividade-adaptada.entity';
import { RelatorioSemanalNEE } from '../database/entities/relatorio-semanal-nee.entity';
import { AtaPedagogica } from '../database/entities/ata-pedagogica.entity';
import { ObservacaoSupervisor } from '../database/entities/observacao-supervisor.entity';
import { CreatePlanejamentoBimestralDto } from './dto/create-planejamento-bimestral.dto';
import { CreateAnexoPlanoDto } from './dto/create-anexo-plano.dto';
import { CreateAtividadeAdaptadaDto } from './dto/create-atividade-adaptada.dto';
import { CreateRelatorioSemanalDto } from './dto/create-relatorio-semanal.dto';
import { CreateAtaPedagogicaDto } from './dto/create-ata-pedagogica.dto';

@Injectable()
export class PedagogicoService {
  constructor(
    @InjectRepository(PlanejamentoBimestral)
    private planejamentoBimestralRepo: Repository<PlanejamentoBimestral>,
    @InjectRepository(AnexoPlanoAula)
    private anexoPlanoRepo: Repository<AnexoPlanoAula>,
    @InjectRepository(AtividadeAdaptada)
    private atividadeAdaptadaRepo: Repository<AtividadeAdaptada>,
    @InjectRepository(RelatorioSemanalNEE)
    private relatorioSemanalRepo: Repository<RelatorioSemanalNEE>,
    @InjectRepository(AtaPedagogica)
    private ataPedagogicaRepo: Repository<AtaPedagogica>,
    @InjectRepository(ObservacaoSupervisor)
    private observacaoSupervisorRepo: Repository<ObservacaoSupervisor>,
  ) {}

  // Planejamentos Bimestrais
  async createPlanejamentoBimestral(dto: CreatePlanejamentoBimestralDto, userId: string) {
    const planejamento = this.planejamentoBimestralRepo.create({
      ...dto,
      autorId: userId,
    });
    return this.planejamentoBimestralRepo.save(planejamento);
  }

  async getPlanejamentosBimestrais(turmaId: string) {
    return this.planejamentoBimestralRepo.find({
      where: { turmaId },
      order: { bimestre: 'ASC' },
    });
  }

  async updatePlanejamentoBimestral(id: string, conteudo: string, userId: string) {
    const planejamento = await this.planejamentoBimestralRepo.findOne({ where: { id } });
    if (!planejamento) throw new NotFoundException('Planejamento não encontrado');
    
    planejamento.conteudo = conteudo;
    return this.planejamentoBimestralRepo.save(planejamento);
  }

  // Anexos de Plano de Aula
  async createAnexoPlano(dto: CreateAnexoPlanoDto, arquivo?: string) {
    const anexo = this.anexoPlanoRepo.create({
      ...dto,
      caminhoArquivo: arquivo,
    });
    return this.anexoPlanoRepo.save(anexo);
  }

  async getAnexosPlano(planoAulaId: string) {
    return this.anexoPlanoRepo.find({
      where: { planoAulaId },
      order: { createdAt: 'DESC' },
    });
  }

  async deleteAnexoPlano(id: string) {
    const result = await this.anexoPlanoRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Anexo não encontrado');
    return { message: 'Anexo removido com sucesso' };
  }

  // Atividades Adaptadas (NEE)
  async createAtividadeAdaptada(dto: CreateAtividadeAdaptadaDto, userId: string) {
    const atividade = this.atividadeAdaptadaRepo.create({
      ...dto,
      autorId: userId,
    });
    return this.atividadeAdaptadaRepo.save(atividade);
  }

  async getAtividadesAdaptadas(turmaId: string) {
    return this.atividadeAdaptadaRepo.find({
      where: { turmaId },
      order: { data: 'DESC' },
    });
  }

  async addFotoAtividade(id: string, foto: string) {
    const atividade = await this.atividadeAdaptadaRepo.findOne({ where: { id } });
    if (!atividade) throw new NotFoundException('Atividade não encontrada');
    
    atividade.fotos = [...atividade.fotos, foto];
    return this.atividadeAdaptadaRepo.save(atividade);
  }

  // Relatórios Semanais NEE
  async createRelatorioSemanal(dto: CreateRelatorioSemanalDto, userId: string) {
    const relatorio = this.relatorioSemanalRepo.create({
      ...dto,
      autorId: userId,
    });
    return this.relatorioSemanalRepo.save(relatorio);
  }

  async getRelatoriosSemanais(turmaId: string) {
    return this.relatorioSemanalRepo.find({
      where: { turmaId },
      order: { dataInicio: 'DESC' },
    });
  }

  // Atas Pedagógicas
  async createAtaPedagogica(dto: CreateAtaPedagogicaDto, userId: string) {
    const ata = this.ataPedagogicaRepo.create({
      ...dto,
      autorId: userId,
    });
    return this.ataPedagogicaRepo.save(ata);
  }

  async getAtasPedagogicas(userId: string) {
    return this.ataPedagogicaRepo.find({
      where: { autorId: userId },
      order: { data: 'DESC' },
    });
  }

  // Observações do Supervisor
  async getObservacoesSupervisor(professorId: string, turmaId?: string) {
    const where: any = { professorId };
    if (turmaId) where.turmaId = turmaId;
    
    return this.observacaoSupervisorRepo.find({
      where,
      order: { data: 'DESC' },
      relations: ['supervisor', 'turma'],
    });
  }
}
