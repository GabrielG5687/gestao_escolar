import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Turma } from './turma.entity';

@Entity('conselhos_classe')
export class ConselhoClasse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'turma_id' })
  turmaId: string;

  @Column({ name: 'periodo_bimestre' })
  periodoBimestre: string;

  @Column('text')
  participantes: string;

  @Column('text', { name: 'relatorio_geral' })
  relatorioGeral: string;

  @Column('text', { name: 'relatorios_individuais', nullable: true })
  relatoriosIndividuais: string;

  @Column('simple-array', { default: '' })
  anexos: string[];

  @Column({ name: 'autor_id' })
  autorId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Turma, (turma) => turma.conselhosClasse)
  @JoinColumn({ name: 'turma_id' })
  turma: Turma;

  @ManyToOne(() => User, (user) => user.conselhosClasse)
  @JoinColumn({ name: 'autor_id' })
  autor: User;
}
