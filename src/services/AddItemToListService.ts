import { getCustomRepository } from 'typeorm'
import { ListsProductsRepositories } from '../repositories/ListProductRepositories'

class AddItemToListService {
  async execute(listId: string, productId: string) {
    const repository = getCustomRepository(ListsProductsRepositories)
    const itemAdded = repository.create({ listId, productId })
    await repository.save(itemAdded)
    return itemAdded
  }
}

export { AddItemToListService }
