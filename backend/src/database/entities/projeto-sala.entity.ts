import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Turma } from './turma.entity';

@Entity('projetos_sala')
export class ProjetoSala {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column('text')
  descricao: string;

  @Column({ name: 'turma_id', nullable: true })
  turmaId: string;

  @Column({ name: 'responsavel_id' })
  responsavelId: string;

  @Column('date', { name: 'data_inicio' })
  dataInicio: Date;

  @Column('date', { name: 'data_fim', nullable: true })
  dataFim: Date;

  @Column('simple-array', { default: '' })
  anexos: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Turma, (turma) => turma.projetosSala, { nullable: true })
  @JoinColumn({ name: 'turma_id' })
  turma: Turma;

  @ManyToOne(() => User, (user) => user.projetosSala)
  @JoinColumn({ name: 'responsavel_id' })
  responsavel: User;
}
