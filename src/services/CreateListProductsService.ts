import { getCustomRepository } from 'typeorm'
import { ListsProductsRepositories } from '../repositories/ListProductRepositories'

class CreateListProductsService {
  async execute(listId: string, productId: string) {
    const repository = getCustomRepository(ListsProductsRepositories)

    const listProducts = repository.create({
      listId,
      productId
    })

    await repository.save(listProducts)
    return listProducts
  }
}

export { CreateListProductsService }
