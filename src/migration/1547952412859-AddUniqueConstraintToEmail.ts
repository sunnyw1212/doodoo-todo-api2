import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUniqueConstraintToEmail1547952412859 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_a8979f71f59cb66a8b03bde38c` (`email_address`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_a8979f71f59cb66a8b03bde38c`");
    }

}
