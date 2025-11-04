import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { PlanejamentoAnual } from './planejamento-anual.entity';
import { PlanoAula } from './plano-aula.entity';
import { ObservacaoParticipacao } from './observacao-participacao.entity';
import { NeeAtividade } from './nee-atividade.entity';
import { ProjetoSala } from './projeto-sala.entity';
import { AtaOcorrencia } from './ata-ocorrencia.entity';
import { ConselhoClasse } from './conselho-classe.entity';

@Entity('turmas')
export class Turma {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  ano: number;

  @Column()
  serie: string;

  @Column({ name: 'professor_responsavel_id' })
  professorResponsavelId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.turmasResponsavel)
  @JoinColumn({ name: 'professor_responsavel_id' })
  professorResponsavel: User;

  @OneToMany(() => PlanejamentoAnual, (planejamento) => planejamento.turma)
  planejamentosAnuais: PlanejamentoAnual[];

  @OneToMany(() => PlanoAula, (plano) => plano.turma)
  planosAula: PlanoAula[];

  @OneToMany(() => ObservacaoParticipacao, (observacao) => observacao.turma)
  observacoesParticipacao: ObservacaoParticipacao[];

  @OneToMany(() => NeeAtividade, (nee) => nee.turma)
  neeAtividades: NeeAtividade[];

  @OneToMany(() => ProjetoSala, (projeto) => projeto.turma)
  projetosSala: ProjetoSala[];

  @OneToMany(() => AtaOcorrencia, (ata) => ata.turma)
  atasOcorrencia: AtaOcorrencia[];

  @OneToMany(() => ConselhoClasse, (conselho) => conselho.turma)
  conselhosClasse: ConselhoClasse[];
}
