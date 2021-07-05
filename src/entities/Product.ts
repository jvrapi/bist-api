import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { ListProduct } from './ListProduct'

@Entity('products')
class Product {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @OneToMany(() => ListProduct, listProduct => listProduct.product)
  listsProducts: ListProduct[]

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Product }
