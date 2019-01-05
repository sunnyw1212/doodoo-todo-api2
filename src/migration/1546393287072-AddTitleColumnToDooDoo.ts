import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTitleColumnToDooDoo1546393287072 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `doo_doo` ADD `title` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `doo_doo` DROP COLUMN `title`");
    }

}
