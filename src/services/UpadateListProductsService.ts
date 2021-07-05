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
    const updatedListProducts = await repository.save(listProducts)
    return updatedListProducts
  }
}

export { UpdateListProductsService }
