import {MigrationInterface, QueryRunner} from "typeorm";

export class RageTable1607148687347 implements MigrationInterface {
    name = 'RageTable1607148687347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "rage"."updated_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "rage" ALTER COLUMN "updated_at" SET DEFAULT '"2020-12-05T06:11:29.609Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rage" ALTER COLUMN "updated_at" SET DEFAULT '2020-12-05 06:09:53.155'`);
        await queryRunner.query(`COMMENT ON COLUMN "rage"."updated_at" IS NULL`);
    }

}
