import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class poolInfos1646364503477 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pool_infos',
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
            type: 'int',
            default: '5',
          },
          {
            name: 'symbol',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'pool_type',
            type: 'int',
            default: '5',
          },
          {
            name: 'url',
            type: 'varchar',
          },
          {
            name: 'open_time',
            type: 'int',
          },
          {
            name: 'close_time',
            type: 'int',
          },
          {
            name: 'last_reward_second',
            type: 'decimal',
            precision: 40,
            scale: 0,
            default: '0',
          },
          {
            name: 'acc_reward_per_share',
            type: 'decimal',
            precision: 40,
            scale: 0,
            default: '0',
          },
          {
            name: 'total_reward',
            type: 'decimal',
            precision: 40,
            scale: 0,
            default: '0',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 40,
            scale: 8,
            default: '0',
          },
          {
            name: 'decimal',
            type: 'decimal',
            precision: 40,
            scale: 0,
            default: '0',
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
    await queryRunner.dropTable('pool_infos');
  }
}
