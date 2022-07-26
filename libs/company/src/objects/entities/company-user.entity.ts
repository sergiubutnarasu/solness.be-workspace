import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BaseEntity, CompanyRole, JsonArrayTransform } from '@solness/core';
import { User } from '@solness/user';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Company } from './company.entity';

@Entity('companyUser')
@ObjectType()
@InputType({ isAbstract: true })
export class CompanyUser extends BaseEntity {
  @Column()
  @Field()
  verified: boolean;

  @Field()
  @Column({ nullable: false })
  userId: number;

  @ManyToOne(() => User, { eager: true })
  user?: User;

  @Field()
  @Column({ nullable: false })
  companyId: number;

  @ManyToOne(() => Company, (company) => company.users)
  company?: Company;

  @Field(() => [String])
  @Column({
    type: 'varchar',
    length: 150,
    transformer: JsonArrayTransform,
    default: JSON.stringify([CompanyRole.User]),
  })
  roles?: CompanyRole[];
}
