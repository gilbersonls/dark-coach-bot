import {MigrationInterface, QueryRunner} from "typeorm";

export class ReageUserColumn1607203467780 implements MigrationInterface {
    name = 'ReageUserColumn1607203467780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "rage"."updated_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "rage" ALTER COLUMN "updated_at" SET DEFAULT '"2020-12-05T21:24:29.944Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rage" ALTER COLUMN "updated_at" SET DEFAULT '2020-12-05 21:23:39.487'`);
        await queryRunner.query(`COMMENT ON COLUMN "rage"."updated_at" IS NULL`);
    }

}
