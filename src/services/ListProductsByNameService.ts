import { getCustomRepository } from 'typeorm'
import { ProductsRepository } from '../repositories/ProductsRepository'
class ListProductByNameService {
  async execute(productName: string) {
    const repository = getCustomRepository(ProductsRepository)
    if (!productName) {
      throw new Error('Missing informations')
    }
    const products = await repository.find({
      take: 3
    })

    const productsFiltered = products.filter(product =>
      product.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .includes(productName.toLowerCase())
    )

    return productsFiltered
  }
}

export { ListProductByNameService }
