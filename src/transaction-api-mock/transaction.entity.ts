import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('transactions') // Table name
export class TransactionEntity {
  @PrimaryColumn('uuid') 
  id: string;

  @Column()
  userId: string;

  @Column('decimal', { precision: 10, scale: 2 }) 
  amount: number;

  @Column()
  type: string;

  @Column('datetime') 
  createdAt: Date;
}