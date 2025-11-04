import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Turma } from './turma.entity';
import { PlanejamentoAnual } from './planejamento-anual.entity';
import { PlanoAula } from './plano-aula.entity';
import { ComentarioPlano } from './comentario-plano.entity';
import { ObservacaoParticipacao } from './observacao-participacao.entity';
import { NeeAtividade } from './nee-atividade.entity';
import { ProjetoSala } from './projeto-sala.entity';
import { AtaOcorrencia } from './ata-ocorrencia.entity';
import { ConselhoClasse } from './conselho-classe.entity';

export enum Role {
  ADMIN = 'ADMIN',
  SUPERVISOR = 'SUPERVISOR',
  PROFESSOR = 'PROFESSOR',
  ALUNO = 'ALUNO',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.PROFESSOR,
  })
  role: Role;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Turma, (turma) => turma.professorResponsavel)
  turmasResponsavel: Turma[];

  @OneToMany(() => PlanejamentoAnual, (planejamento) => planejamento.autor)
  planejamentosAnuais: PlanejamentoAnual[];

  @OneToMany(() => PlanoAula, (plano) => plano.autor)
  planosAula: PlanoAula[];

  @OneToMany(() => ComentarioPlano, (comentario) => comentario.autor)
  comentariosPlanos: ComentarioPlano[];

  @OneToMany(() => ObservacaoParticipacao, (observacao) => observacao.autor)
  observacoesParticipacao: ObservacaoParticipacao[];

  @OneToMany(() => NeeAtividade, (nee) => nee.autor)
  neeAtividades: NeeAtividade[];

  @OneToMany(() => ProjetoSala, (projeto) => projeto.responsavel)
  projetosSala: ProjetoSala[];

  @OneToMany(() => AtaOcorrencia, (ata) => ata.autor)
  atasOcorrencia: AtaOcorrencia[];

  @OneToMany(() => ConselhoClasse, (conselho) => conselho.autor)
  conselhosClasse: ConselhoClasse[];
}
