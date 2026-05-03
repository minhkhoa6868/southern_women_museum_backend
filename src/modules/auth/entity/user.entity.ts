import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', type: 'varchar', nullable: true })
  firstName?: string;

  @Column({ name: 'last_name', type: 'varchar', nullable: true })
  lastName?: string;

  @Column({ unique: true, type: 'varchar', nullable: true })
  email?: string;

  @Column({ name: 'phone', type: 'varchar', nullable: true })
  phone?: string;

  @Column({ name: 'password_hash', type: 'varchar' })
  passwordHash: string;

  @Column({ name: 'is_admin', type: 'bool', default: false })
  isAdmin: boolean;

  @Column({ name: 'language', type: 'varchar', default: 'en' })
  language: string;

  @Column({ name: 'is_notification_enabled', type: 'bool', default: true })
  isNotificationEn: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  updatedAt: Date;
}