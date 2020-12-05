import {MigrationInterface, QueryRunner} from "typeorm";

export class RageUserColumn1607202725629 implements MigrationInterface {
    name = 'RageUserColumn1607202725629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "rage"."updated_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "rage" ALTER COLUMN "updated_at" SET DEFAULT '"2020-12-05T21:12:07.793Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rage" ALTER COLUMN "updated_at" SET DEFAULT '2020-12-05 21:10:45.627'`);
        await queryRunner.query(`COMMENT ON COLUMN "rage"."updated_at" IS NULL`);
    }

}
