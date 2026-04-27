import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'rooms' })
@Unique('rooms_code_key', ['code'])
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Column({ name: 'name_en', type: 'varchar', nullable: false })
  nameEn!: string;

  @Column({ type: 'varchar', nullable: false })
  code!: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string | null;

  @Column({ name: 'description_en', type: 'varchar', nullable: true })
  descriptionEn?: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  updatedAt?: Date | null;
}
