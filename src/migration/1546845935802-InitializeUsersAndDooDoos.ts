import {MigrationInterface, QueryRunner} from "typeorm";

export class InitializeUsersAndDooDoos1546845935802 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `email_address` varchar(50) NOT NULL, `password_hash` varchar(100) NOT NULL, `access_token` varchar(50) NOT NULL, `is_doer` tinyint NOT NULL, `assigned_doer` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `doo_doo` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(100) NOT NULL, `body` text NOT NULL, `created_by` int NOT NULL, `assigned_to` int NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX `IDX_98e1899685119d0cae92c4e1c2` (`assigned_to`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `doo_doo` ADD CONSTRAINT `FK_98e1899685119d0cae92c4e1c2d` FOREIGN KEY (`assigned_to`) REFERENCES `user`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `doo_doo` ADD CONSTRAINT `FK_79e8db6dce3b6fad4c3e724baed` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `doo_doo` DROP FOREIGN KEY `FK_79e8db6dce3b6fad4c3e724baed`");
        await queryRunner.query("ALTER TABLE `doo_doo` DROP FOREIGN KEY `FK_98e1899685119d0cae92c4e1c2d`");
        await queryRunner.query("DROP INDEX `IDX_98e1899685119d0cae92c4e1c2` ON `doo_doo`");
        await queryRunner.query("DROP TABLE `doo_doo`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
