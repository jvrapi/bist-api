import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { v4 as uuid } from 'uuid'
import { ListProduct } from './ListProduct'
@Entity('lists')
class List {
  @PrimaryColumn()
  id: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @OneToMany(() => ListProduct, listProduct => listProduct.list)
  listsProducts: ListProduct[]

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { List }
