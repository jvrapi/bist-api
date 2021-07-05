import { getCustomRepository } from 'typeorm'
import { ListsRepositories } from '../repositories/ListRepositories'
import { ListListsView } from '../views/ListListsView'

class ListListsService {
  async execute() {
    const repository = getCustomRepository(ListsRepositories)
    const view = new ListListsView()
    const lists = await repository.find({
      relations: ['listsProducts']
    })

    return view.format(lists)
  }
}

export { ListListsService }
