import { EntityRepository, Repository } from 'typeorm'
import { ListProduct } from '../entities/ListProduct'

@EntityRepository(ListProduct)
class ListsProductsRepository extends Repository<ListProduct> { }

export { ListsProductsRepository }
