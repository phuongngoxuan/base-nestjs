import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class poolInfos1662694518757 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pools_infos',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            unsigned: true,
          },
          {
            name: 'chain_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'total_stake',
            type: 'decimal',
            precision: 40,
            scale: 0,
            isNullable: false,
            default: 0,
          },
          {
            name: 'total_un_stake',
            type: 'decimal',
            precision: 40,
            scale: 0,
            isNullable: false,
            default: 0,
          },
          {
            name: 'total_claim',
            type: 'decimal',
            precision: 40,
            scale: 0,
            isNullable: false,
            default: 0,
          },
          {
            name: 'created_at',
            type: 'datetime',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pools');
  }
}
