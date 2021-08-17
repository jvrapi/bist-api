import { getCustomRepository } from 'typeorm'
import { List } from '../entities/List'
import { ListsRepository } from '../repositories/ListsRepository'

class CreateListService {
  async execute() {
    const repository = getCustomRepository(ListsRepository)
    const list = await repository.save(new List())
    return list
  }
}

export { CreateListService }
