import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { List } from './List'
import { Product } from './Product'

@Entity('lists_products')
class ListProduct {
  @PrimaryColumn()
  id: string

  @Column({ name: 'products_id' })
  productId: string

  @Column({ name: 'lists_id' })
  listId: string

  @Column()
  amount: number | undefined

  @Column()
  price: number | undefined

  @ManyToOne(() => List, list => list.listsProducts)
  @JoinColumn({ name: 'lists_id' })
  list: List

  @ManyToOne(() => Product, product => product.listsProducts)
  @JoinColumn({ name: 'products_id' })
  product: Product

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { ListProduct }
