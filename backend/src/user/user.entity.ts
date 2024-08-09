import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nomeCompleto: string;

  @Column()
  public email: string;
}

export default User;
