import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { PlanoAula } from './plano-aula.entity';

@Entity('comentarios_planos')
export class ComentarioPlano {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'plano_aula_id' })
  planoAulaId: string;

  @Column({ name: 'autor_id' })
  autorId: string;

  @Column('text')
  texto: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @ManyToOne(() => PlanoAula, (plano) => plano.comentarios, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'plano_aula_id' })
  planoAula: PlanoAula;

  @ManyToOne(() => User, (user) => user.comentariosPlanos)
  @JoinColumn({ name: 'autor_id' })
  autor: User;
}
