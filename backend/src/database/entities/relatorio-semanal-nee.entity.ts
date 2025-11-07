import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Turma } from './turma.entity';

@Entity('relatorios_semanais_nee')
export class RelatorioSemanalNEE {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'turma_id' })
  turmaId: string;

  @Column({ name: 'aluno_nome' })
  alunoNome: string;

  @Column('date', { name: 'data_inicio' })
  dataInicio: Date;

  @Column('date', { name: 'data_fim' })
  dataFim: Date;

  @Column('text')
  desenvolvimento: string;

  @Column('text', { nullable: true })
  observacoes: string;

  @Column({ name: 'autor_id' })
  autorId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Turma)
  @JoinColumn({ name: 'turma_id' })
  turma: Turma;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'autor_id' })
  autor: User;
}
