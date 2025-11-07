import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

export enum TipoAta {
  ATENDIMENTO_INDIVIDUAL = 'ATENDIMENTO_INDIVIDUAL',
  REUNIAO_PEDAGOGICA = 'REUNIAO_PEDAGOGICA',
}

@Entity('atas_pedagogicas')
export class AtaPedagogica {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: TipoAta,
  })
  tipo: TipoAta;

  @Column('date')
  data: Date;

  @Column()
  titulo: string;

  @Column('text')
  conteudo: string;

  @Column('simple-array', { default: '' })
  participantes: string[];

  @Column({ name: 'autor_id' })
  autorId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'autor_id' })
  autor: User;
}
