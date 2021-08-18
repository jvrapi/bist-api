import { getCustomRepository } from 'typeorm'
import { ListsRepository } from '../repositories/ListsRepository'

class DeleteListService {
  async execute(listId: string) {
    const repository = getCustomRepository(ListsRepository)
    try {
      await repository.delete(listId)
    } catch (error) {
      throw new Error('Error when try delete list: \n' + error)
    }

    return { message: 'List deleted' }
  }
}

export { DeleteListService }
