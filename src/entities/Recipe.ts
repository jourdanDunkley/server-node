import { ObjectType, Field, ID } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Recipe extends BaseEntity{
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field({ nullable: true })
  description?: string;

  @Column()
  @Field(type => String)
  ingredients: string;
}