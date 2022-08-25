import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
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
            name: 'user_id',
            type: 'int',
            unsigned: true,
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
            type: 'varchar',
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

    await queryRunner.createForeignKey(
      'user_histories',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user_infos',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user_histories');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );
    await queryRunner.dropForeignKey('user_id', foreignKey);
    await queryRunner.dropColumn('user_histories', 'user_id');
    await queryRunner.dropTable('user_histories');
  }
}
