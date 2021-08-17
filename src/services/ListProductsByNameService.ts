import { getCustomRepository, Like } from 'typeorm'
import { ProductsRepository } from '../repositories/ProductsRepository'
import { capitalize } from '../utils/capitalize'
class ListProductByNameService {
  async execute(name: string) {
    const repository = getCustomRepository(ProductsRepository)
    if (!name) {
      throw new Error('Missing informations')
    }
    const product = await repository.find({
      where: {
        name: Like(`%${capitalize(name)}%`)
      },
      take: 3
    })
    return product
  }
}

export { ListProductByNameService }
