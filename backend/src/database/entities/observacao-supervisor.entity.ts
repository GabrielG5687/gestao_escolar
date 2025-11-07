import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Turma } from './turma.entity';

@Entity('observacoes_supervisor')
export class ObservacaoSupervisor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'turma_id' })
  turmaId: string;

  @Column({ name: 'professor_id' })
  professorId: string;

  @Column('date')
  data: Date;

  @Column()
  assunto: string;

  @Column('text')
  observacao: string;

  @Column({ name: 'supervisor_id' })
  supervisorId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Turma)
  @JoinColumn({ name: 'turma_id' })
  turma: Turma;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'professor_id' })
  professor: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'supervisor_id' })
  supervisor: User;
}
