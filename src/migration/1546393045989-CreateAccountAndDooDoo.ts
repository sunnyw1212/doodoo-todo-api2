import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAccountAndDooDoo1546393045989 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `doo_doo` (`id` int NOT NULL AUTO_INCREMENT, `body` varchar(255) NULL, `created_by` int NOT NULL, `assigned_to` int NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX `IDX_98e1899685119d0cae92c4e1c2` (`assigned_to`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `account` (`id` int NOT NULL AUTO_INCREMENT, `email_address` varchar(255) NOT NULL, `password_hash` varchar(255) NOT NULL, `is_doer` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `doo_doo` ADD CONSTRAINT `FK_98e1899685119d0cae92c4e1c2d` FOREIGN KEY (`assigned_to`) REFERENCES `account`(`id`) ON DELETE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `doo_doo` DROP FOREIGN KEY `FK_98e1899685119d0cae92c4e1c2d`");
        await queryRunner.query("DROP TABLE `account`");
        await queryRunner.query("DROP INDEX `IDX_98e1899685119d0cae92c4e1c2` ON `doo_doo`");
        await queryRunner.query("DROP TABLE `doo_doo`");
    }

}
