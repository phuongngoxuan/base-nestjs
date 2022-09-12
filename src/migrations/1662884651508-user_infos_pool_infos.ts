import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class userInfosPoolInfos1662884651508 implements MigrationInterface {
  name = 'userInfosPoolInfos1662884651508';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_infos_pool_infos',
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
            name: 'user_id',
            type: 'int',
            unsigned: true,
          },
          {
            name: 'pool_id',
            type: 'int',
            unsigned: true,
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
      'user_infos_pool_infos',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user_infos',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'user_infos_pool_infos',
      new TableForeignKey({
        columnNames: ['pool_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pools_infos',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user_infos_pool_infos');
    const foreignKeyUserId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );
    await queryRunner.dropForeignKey('user_id', foreignKeyUserId);
    await queryRunner.dropColumn('user_infos_pool_infos', 'user_id');

    const foreignKeyPoolId = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('pool_id') !== -1,
    );
    await queryRunner.dropForeignKey('pool_id', foreignKeyPoolId);
    await queryRunner.dropColumn('user_infos_pool_infos', 'pool_id');

    await queryRunner.dropTable('user_histories');
  }
}
