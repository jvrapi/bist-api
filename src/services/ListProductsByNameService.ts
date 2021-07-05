import { getCustomRepository, Like } from 'typeorm'
import { ProductsRepositories } from '../repositories/ProductRepositories'
import { capitalize } from '../utils/capitalize'
class ListProductByNameService {
  async execute(name: string) {
    const repository = getCustomRepository(ProductsRepositories)
    if (!name) {
      throw new Error('Missing informations')
    }
    const product = await repository.find({
      where: {
        name: Like(`%${capitalize(name)}%`)
      }
    })
    return product
  }
}

export { ListProductByNameService }
