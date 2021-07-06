import { getCustomRepository } from 'typeorm'
import { ListsRepositories } from '../repositories/ListRepositories'

class DeleteListsService {
  execute(lists: string[]) {
    const repository = getCustomRepository(ListsRepositories)

    lists.forEach(async (listId: string) => {
      try {
        await repository.delete(listId)
      } catch (error) {
        throw new Error('Error when try delete list')
      }
    })

    return { message: 'All lists deleted' }
  }
}

export { DeleteListsService }
