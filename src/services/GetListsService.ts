import { getCustomRepository } from 'typeorm'
import { ListsRepositories } from '../repositories/ListRepositories'
import { ListListsView } from '../views/GetListsView'

class GetListsService {
  async execute() {
    const repository = getCustomRepository(ListsRepositories)
    const view = new ListListsView()
    const lists = await repository.find({
      relations: ['listsProducts'],
      order: {
        createdAt: 'ASC'
      }
    })

    return view.format(lists)
  }
}

export { GetListsService }
