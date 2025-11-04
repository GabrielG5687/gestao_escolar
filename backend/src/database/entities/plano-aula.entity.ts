import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Turma } from './turma.entity';
import { ComentarioPlano } from './comentario-plano.entity';

export enum StatusPlano {
  RASCUNHO = 'RASCUNHO',
  PUBLICADO = 'PUBLICADO',
}

@Entity('planos_aula')
export class PlanoAula {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'turma_id' })
  turmaId: string;

  @Column('date')
  data: Date;

  @Column()
  disciplina: string;

  @Column()
  tema: string;

  @Column('text')
  objetivo: string;

  @Column('text', { nullable: true })
  recursos: string;

  @Column('text', { nullable: true })
  atividades: string;

  @Column('text', { name: 'avaliacao_planejada', nullable: true })
  avaliacaoPlaneada: string;

  @Column('text', { nullable: true })
  observacoes: string;

  @Column({ name: 'autor_id' })
  autorId: string;

  @Column({
    type: 'enum',
    enum: StatusPlano,
    default: StatusPlano.RASCUNHO,
  })
  status: StatusPlano;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Turma, (turma) => turma.planosAula)
  @JoinColumn({ name: 'turma_id' })
  turma: Turma;

  @ManyToOne(() => User, (user) => user.planosAula)
  @JoinColumn({ name: 'autor_id' })
  autor: User;

  @OneToMany(() => ComentarioPlano, (comentario) => comentario.planoAula)
  comentarios: ComentarioPlano[];
}
