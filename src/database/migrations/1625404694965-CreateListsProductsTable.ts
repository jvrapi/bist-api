import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateListsProductsTable1625404694965
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'lists_products',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'products_id',
            type: 'varchar'
          },
          {
            name: 'lists_id',
            type: 'varchar'
          },
          {
            name: 'amount',
            type: 'integer',
            isNullable: true,
            default: '1'
          },
          {
            name: 'price',
            type: 'decimal',
            isNullable: true,
            default: 0
          }
        ],
        foreignKeys: [
          {
            name: 'FK_Product_ListProducts',
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['products_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            name: 'FK_List_ListProducts',
            referencedTableName: 'lists',
            referencedColumnNames: ['id'],
            columnNames: ['lists_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('lists_products')
  }
}
