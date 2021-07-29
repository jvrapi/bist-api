import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddCreatedAtFieldInListsProductsTable1627571789040
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'lists_products',
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('lists_products', 'created_at')
  }
}
