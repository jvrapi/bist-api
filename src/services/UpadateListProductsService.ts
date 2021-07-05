import { getCustomRepository } from 'typeorm'
import { ListsProductsRepositories } from '../repositories/ListProductRepositories'

type UpdateData = {
  id: string
  productId: string
  listId: string
  price: number
  amount: number
}

class UpdateListProductsService {
  async execute(listProducts: UpdateData) {
    const repository = getCustomRepository(ListsProductsRepositories)

    if (!listProducts.id || !listProducts.listId || !listProducts.productId) {
      throw new Error('Missing informations')
    }

    if (listProducts.price === null) {
      listProducts.price = 0
    }
    const updatedListProducts = await repository.save(listProducts)

    return updatedListProducts
  }
}

export { UpdateListProductsService }
