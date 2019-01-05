import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterAssignedDoerColumnAccount1546406363119 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `account` CHANGE `assigned_doer` `assigned_doer` int NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `account` CHANGE `assigned_doer` `assigned_doer` int NOT NULL");
    }

}
