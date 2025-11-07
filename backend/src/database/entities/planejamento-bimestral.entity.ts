import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Turma } from './turma.entity';

export enum Bimestre {
  PRIMEIRO = '1',
  SEGUNDO = '2',
  TERCEIRO = '3',
  QUARTO = '4',
}

@Entity('planejamentos_bimestrais')
export class PlanejamentoBimestral {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'turma_id' })
  turmaId: string;

  @Column({ name: 'ano_letivo' })
  anoLetivo: number;

  @Column({
    type: 'enum',
    enum: Bimestre,
  })
  bimestre: Bimestre;

  @Column('text')
  conteudo: string;

  @Column('simple-array', { default: '' })
  anexos: string[];

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
