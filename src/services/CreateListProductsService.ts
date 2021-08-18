import { getCustomRepository } from 'typeorm'
import { ListsProductsRepository } from '../repositories/ListsProductsRepository'

class CreateListProductsService {
  async execute(listId: string, productId: string) {
    const repository = getCustomRepository(ListsProductsRepository)

    const listProducts = repository.create({
      listId,
      productId
    })

    await repository.save(listProducts)
    return listProducts
  }
}

export { CreateListProductsService }
