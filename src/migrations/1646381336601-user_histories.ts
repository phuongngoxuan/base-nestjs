import { MigrationInterface, QueryRunner, Table } from 'typeorm';
export class userHistories1646381336601 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_histories',
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
            name: 'user_address',
            type: 'varchar',
          },
          {
            name: 'from',
            type: 'varchar',
          },
          {
            name: 'to',
            type: 'varchar',
          },
          {
            name: 'tx_hash',
            type: 'varchar',
          },
          {
            name: 'block_number',
            type: 'varchar',
          },
          {
            name: 'log_index',
            type: 'int',
          },
          {
            name: 'action',
            type: 'varchar',
          },
          {
            name: 'amount',
            type: 'decimal',
            precision: 40,
            scale: 30,
            default: '0',
          },
          {
            name: 'symbol',
            type: 'varchar',
          },
          {
            name: 'decimal',
            type: 'int',
            default: 0,
          },
          {
            name: 'block_timestamp',
            type: 'int',
          },
          {
            name: 'pool_id',
            type: 'int',
            default: 0,
          },
          {
            name: 'pool_address',
            type: 'varchar',
          },
          {
            name: 'url',
            type: 'varchar',
          },
          {
            name: 'start_stake',
            type: 'int',
            default: 0,
          },
          {
            name: 'chain_id',
            type: 'int',
          },
          {
            name: 'data',
            type: 'json',
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
    await queryRunner.dropTable('user_histories');
  }
}
