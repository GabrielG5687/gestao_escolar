import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PlanoAula } from './plano-aula.entity';

export enum TipoAnexo {
  SLIDE = 'SLIDE',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
  PDF = 'PDF',
  IMAGEM = 'IMAGEM',
  LINK = 'LINK',
}

@Entity('anexos_plano_aula')
export class AnexoPlanoAula {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'plano_aula_id' })
  planoAulaId: string;

  @Column({
    type: 'enum',
    enum: TipoAnexo,
  })
  tipo: TipoAnexo;

  @Column()
  titulo: string;

  @Column({ nullable: true })
  url: string;

  @Column({ name: 'caminho_arquivo', nullable: true })
  caminhoArquivo: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => PlanoAula, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'plano_aula_id' })
  planoAula: PlanoAula;
}
