import { getCustomRepository } from 'typeorm'
import { ListsProductsRepository } from '../repositories/ListsProductsRepository'

class ListProductsDetailsService {
  async execute(listId: string) {
    const repository = getCustomRepository(ListsProductsRepository)

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
