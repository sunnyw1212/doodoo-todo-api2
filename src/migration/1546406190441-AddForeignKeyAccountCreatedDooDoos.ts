import {MigrationInterface, QueryRunner} from "typeorm";

export class AddForeignKeyAccountCreatedDooDoos1546406190441 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `account` ADD `assigned_doer` int NOT NULL");
        await queryRunner.query("ALTER TABLE `doo_doo` DROP COLUMN `title`");
        await queryRunner.query("ALTER TABLE `doo_doo` ADD `title` varchar(100) NOT NULL");
        await queryRunner.query("ALTER TABLE `doo_doo` DROP COLUMN `body`");
        await queryRunner.query("ALTER TABLE `doo_doo` ADD `body` text NOT NULL");
        await queryRunner.query("ALTER TABLE `account` DROP COLUMN `email_address`");
        await queryRunner.query("ALTER TABLE `account` ADD `email_address` varchar(50) NOT NULL");
        await queryRunner.query("ALTER TABLE `account` DROP COLUMN `password_hash`");
        await queryRunner.query("ALTER TABLE `account` ADD `password_hash` varchar(50) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `account` DROP COLUMN `password_hash`");
        await queryRunner.query("ALTER TABLE `account` ADD `password_hash` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `account` DROP COLUMN `email_address`");
        await queryRunner.query("ALTER TABLE `account` ADD `email_address` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `doo_doo` DROP COLUMN `body`");
        await queryRunner.query("ALTER TABLE `doo_doo` ADD `body` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `doo_doo` DROP COLUMN `title`");
        await queryRunner.query("ALTER TABLE `doo_doo` ADD `title` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `account` DROP COLUMN `assigned_doer`");
    }

}
