import { EntityRepository, Repository } from 'typeorm'
import { ListProduct } from '../entities/ListProduct'

@EntityRepository(ListProduct)
class ListsProductsRepositories extends Repository<ListProduct> {}

export { ListsProductsRepositories }
