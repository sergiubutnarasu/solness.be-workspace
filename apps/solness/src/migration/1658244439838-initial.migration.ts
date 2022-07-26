import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1658244439838 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "cashRegisterEntry" (
                "id" SERIAL NOT NULL,
                "enabled" boolean NOT NULL,
                "createdUserId" integer NOT NULL,
                "createdDatetime" TIMESTAMP NOT NULL DEFAULT now(),
                "modifiedUserId" integer,
                "modifiedDatetime" TIMESTAMP DEFAULT now(),
                "companyId" integer NOT NULL,
                "date" TIMESTAMP NOT NULL,
                "docNumber" character varying(100) NOT NULL,
                "annexNumber" character varying(100),
                "description" character varying(250) NOT NULL,
                "value" integer NOT NULL DEFAULT '0',
                CONSTRAINT "PK_4834d6a5b769f8f4d4b0e86fe24" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "enabled" boolean NOT NULL,
                "createdUserId" integer NOT NULL,
                "createdDatetime" TIMESTAMP NOT NULL DEFAULT now(),
                "modifiedUserId" integer,
                "modifiedDatetime" TIMESTAMP DEFAULT now(),
                "email" character varying(150) NOT NULL,
                "verified" boolean NOT NULL DEFAULT false,
                "firstName" character varying(150) NOT NULL,
                "lastName" character varying(150) NOT NULL,
                "title" character varying(250),
                "description" character varying(650),
                "password" character varying(250) NOT NULL,
                "role" "public"."user_role_enum" NOT NULL DEFAULT 'User',
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "refreshToken" (
                "id" SERIAL NOT NULL,
                "enabled" boolean NOT NULL,
                "createdUserId" integer NOT NULL,
                "createdDatetime" TIMESTAMP NOT NULL DEFAULT now(),
                "modifiedUserId" integer,
                "modifiedDatetime" TIMESTAMP DEFAULT now(),
                "userId" integer NOT NULL,
                "token" character varying(250) NOT NULL,
                "expireDate" TIMESTAMP NOT NULL,
                CONSTRAINT "PK_be91607b0697b092c2bdff83b45" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "company" (
                "id" SERIAL NOT NULL,
                "enabled" boolean NOT NULL,
                "createdUserId" integer NOT NULL,
                "createdDatetime" TIMESTAMP NOT NULL DEFAULT now(),
                "modifiedUserId" integer,
                "modifiedDatetime" TIMESTAMP DEFAULT now(),
                "name" character varying(250) NOT NULL,
                "slogan" character varying(250),
                "description" character varying(1500),
                "email" character varying(150) NOT NULL,
                "registerNumber" character varying(150) NOT NULL,
                "phone" character varying(150) NOT NULL,
                "website" character varying(250),
                "initialCashValue" character varying(150),
                "initialCashIndex" integer,
                CONSTRAINT "UQ_ec949b98f0cab3f9c0df33e727e" UNIQUE ("registerNumber"),
                CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "companyUser" (
                "id" SERIAL NOT NULL,
                "enabled" boolean NOT NULL,
                "createdUserId" integer NOT NULL,
                "createdDatetime" TIMESTAMP NOT NULL DEFAULT now(),
                "modifiedUserId" integer,
                "modifiedDatetime" TIMESTAMP DEFAULT now(),
                "verified" boolean NOT NULL,
                "userId" integer NOT NULL,
                "companyId" integer NOT NULL,
                "roles" character varying(150) NOT NULL DEFAULT '["User"]',
                CONSTRAINT "PK_d326b2101fb70a5c467ebc13892" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "cashRegisterEntry"
            ADD CONSTRAINT "FK_0feb477735d634b76eb59cced1f" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "refreshToken"
            ADD CONSTRAINT "FK_7008a2b0fb083127f60b5f4448e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "companyUser"
            ADD CONSTRAINT "FK_cef3489d394ad981b98c440fb9a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "companyUser"
            ADD CONSTRAINT "FK_e76e326c288917b1f5f5cf92f00" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "companyUser" DROP CONSTRAINT "FK_e76e326c288917b1f5f5cf92f00"
        `);
    await queryRunner.query(`
            ALTER TABLE "companyUser" DROP CONSTRAINT "FK_cef3489d394ad981b98c440fb9a"
        `);
    await queryRunner.query(`
            ALTER TABLE "refreshToken" DROP CONSTRAINT "FK_7008a2b0fb083127f60b5f4448e"
        `);
    await queryRunner.query(`
            ALTER TABLE "cashRegisterEntry" DROP CONSTRAINT "FK_0feb477735d634b76eb59cced1f"
        `);
    await queryRunner.query(`
            DROP TABLE "companyUser"
        `);
    await queryRunner.query(`
            DROP TABLE "company"
        `);
    await queryRunner.query(`
            DROP TABLE "refreshToken"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
    await queryRunner.query(`
            DROP TABLE "cashRegisterEntry"
        `);
  }
}
