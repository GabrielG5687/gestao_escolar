import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Turma } from './turma.entity';

@Entity('planejamentos_anuais')
export class PlanejamentoAnual {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'escola_id', nullable: true })
  escolaId: string;

  @Column({ name: 'turma_id', nullable: true })
  turmaId: string;

  @Column({ name: 'ano_letivo' })
  anoLetivo: number;

  @Column('text')
  descricao: string;

  @Column({ name: 'autor_id' })
  autorId: string;

  @Column({ default: 'anual' })
  periodo: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Turma, (turma) => turma.planejamentosAnuais, { nullable: true })
  @JoinColumn({ name: 'turma_id' })
  turma: Turma;

  @ManyToOne(() => User, (user) => user.planejamentosAnuais)
  @JoinColumn({ name: 'autor_id' })
  autor: User;
}
