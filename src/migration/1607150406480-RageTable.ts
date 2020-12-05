import {MigrationInterface, QueryRunner} from "typeorm";

export class RageTable1607150406480 implements MigrationInterface {
    name = 'RageTable1607150406480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rage" ("id" integer NOT NULL, "chat_id" integer NOT NULL, "user" character varying NOT NULL, "first_name" character varying, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT '"2020-12-05T06:40:08.746Z"', "quantity" integer NOT NULL, CONSTRAINT "UQ_4dc9ed3966d8527645a20cb1eba" UNIQUE ("user"), CONSTRAINT "PK_432d2471dbd977abe40600cf562" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "rage"`);
    }

}
