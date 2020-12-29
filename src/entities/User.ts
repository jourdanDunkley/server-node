import { Field, ID, ObjectType } from 'type-graphql'
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number

  @Column()
  @Field({ nullable: true })
  name: string

  @Column()
  @Field()
  email: string

  @Column()
  @Field()
  password: string
}