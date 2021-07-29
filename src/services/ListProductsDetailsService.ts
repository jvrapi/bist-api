import { getCustomRepository } from 'typeorm'
import { ListsProductsRepositories } from '../repositories/ListProductRepositories'

class ListProductsDetailsService {
  async execute(listId: string) {
    const repository = getCustomRepository(ListsProductsRepositories)

    if (!listId) {
      throw new Error('Missing informations')
    }
    const listProduct = await repository.find({
      where: { listId },
      relations: ['product'],
      order: {
        createdAt: 'DESC'
      }
    })
    return listProduct
  }
}

export { ListProductsDetailsService }
