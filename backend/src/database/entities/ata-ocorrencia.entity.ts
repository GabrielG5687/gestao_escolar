import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Turma } from './turma.entity';

@Entity('atas_ocorrencia')
export class AtaOcorrencia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'turma_id' })
  turmaId: string;

  @Column('date')
  data: Date;

  @Column()
  titulo: string;

  @Column('text')
  descricao: string;

  @Column('text', { name: 'medidas_tomadas', nullable: true })
  medidasTomadas: string;

  @Column({ name: 'autor_id' })
  autorId: string;

  @Column('simple-array', { default: '' })
  anexos: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Turma, (turma) => turma.atasOcorrencia)
  @JoinColumn({ name: 'turma_id' })
  turma: Turma;

  @ManyToOne(() => User, (user) => user.atasOcorrencia)
  @JoinColumn({ name: 'autor_id' })
  autor: User;
}
