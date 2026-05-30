import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoomEntity } from 'src/modules/room/entity/room.entity';

@Entity({ name: 'artifacts' })
export class ArtifactEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'room_id', type: 'uuid', nullable: true })
  roomId?: string | null;

  @ManyToOne(() => RoomEntity, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'room_id' })
  room?: RoomEntity;

  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string | null;

  @Column({ name: 'description_en', type: 'varchar', nullable: true })
  descriptionEn?: string | null;

  @Column({
    name: 'order_no',
    type: 'bigint',
    nullable: false,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    },
  })
  orderNo!: number;

  @Column({ name: 'img_url', type: 'varchar', nullable: true })
  imgUrl?: string | null;

  @Column({ name: 'history_date', type: 'timestamptz', nullable: true })
  historyDate?: Date | null;

  @Column({ name: 'position_x', type: 'double precision', nullable: true })
  positionX?: number | null;

  @Column({ name: 'position_y', type: 'double precision', nullable: true })
  positionY?: number | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  updatedAt?: Date | null;
}
