import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Turma } from './turma.entity';

@Entity('observacoes_participacao')
export class ObservacaoParticipacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'turma_id' })
  turmaId: string;

  @Column({ name: 'aluno_id', nullable: true })
  alunoId: string;

  @Column('date')
  data: Date;

  @Column()
  criterio: string;

  @Column('text')
  notas: string;

  @Column({ name: 'autor_id' })
  autorId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Turma, (turma) => turma.observacoesParticipacao)
  @JoinColumn({ name: 'turma_id' })
  turma: Turma;

  @ManyToOne(() => User, (user) => user.observacoesParticipacao)
  @JoinColumn({ name: 'autor_id' })
  autor: User;
}
