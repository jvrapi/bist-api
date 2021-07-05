import { getCustomRepository } from 'typeorm'
import { ListsProductsRepositories } from '../repositories/ListProductRepositories'

class ListProductsDetailsService {
  async execute(listId: string) {
    const repository = getCustomRepository(ListsProductsRepositories)
    const listProduct = await repository.find({
      where: { listId },
      relations: ['product']
    })
    return listProduct
  }
}

export { ListProductsDetailsService }
