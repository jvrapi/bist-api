import { getCustomRepository } from 'typeorm'
import { List } from '../entities/List'
import { ListsRepositories } from '../repositories/ListRepositories'

class CreateListService {
  async execute() {
    const repository = getCustomRepository(ListsRepositories)
    const list = await repository.save(new List())
    return list
  }
}

export { CreateListService }
