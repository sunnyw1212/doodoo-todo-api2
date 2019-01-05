import {MigrationInterface, QueryRunner} from "typeorm";

export class AddForeignKeyAccountCreatedDooDoos1546398677652 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `doo_doo` ADD CONSTRAINT `FK_79e8db6dce3b6fad4c3e724baed` FOREIGN KEY (`created_by`) REFERENCES `account`(`id`) ON DELETE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `doo_doo` DROP FOREIGN KEY `FK_79e8db6dce3b6fad4c3e724baed`");
    }

}
