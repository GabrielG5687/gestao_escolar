import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Turma } from './turma.entity';

@Entity('atividades_adaptadas')
export class AtividadeAdaptada {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'turma_id' })
  turmaId: string;

  @Column({ name: 'aluno_nome' })
  alunoNome: string;

  @Column('date')
  data: Date;

  @Column('text')
  descricao: string;

  @Column('text')
  adaptacoes: string;

  @Column('simple-array', { default: '' })
  fotos: string[];

  @Column({ name: 'autor_id' })
  autorId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Turma)
  @JoinColumn({ name: 'turma_id' })
  turma: Turma;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'autor_id' })
  autor: User;
}
