import { getCustomRepository } from 'typeorm'
import { ProductsRepository } from '../repositories/ProductsRepository'
import { removeAccents } from '../utils/removeAccents'
class ListProductByNameService {
  async execute(productName: string) {
    const repository = getCustomRepository(ProductsRepository)

    if (!productName) {
      throw new Error('Missing informations')
    }

    const products = await repository.find()

    const productsFiltered = products.filter(product =>
      removeAccents(product.name)
        .toLowerCase()
        .includes(removeAccents(productName).toLowerCase())
    )

    return productsFiltered
  }
}

export { ListProductByNameService }
