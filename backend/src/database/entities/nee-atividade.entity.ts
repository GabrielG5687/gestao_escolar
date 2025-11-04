import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Turma } from './turma.entity';

@Entity('nee_atividades')
export class NeeAtividade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'turma_id' })
  turmaId: string;

  @Column({ name: 'aluno_id', nullable: true })
  alunoId: string;

  @Column('date')
  data: Date;

  @Column('text', { name: 'descricao_atividade' })
  descricaoAtividade: string;

  @Column('text', { nullable: true })
  adaptacoes: string;

  @Column('text', { name: 'resultado_observado', nullable: true })
  resultadoObservado: string;

  @Column({ name: 'autor_id' })
  autorId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Turma, (turma) => turma.neeAtividades)
  @JoinColumn({ name: 'turma_id' })
  turma: Turma;

  @ManyToOne(() => User, (user) => user.neeAtividades)
  @JoinColumn({ name: 'autor_id' })
  autor: User;
}
