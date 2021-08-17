import { getCustomRepository } from 'typeorm'
import { ListsRepository } from '../repositories/ListsRepository'
import { ListListsView } from '../views/GetListsView'

class GetListsService {
  async execute() {
    const repository = getCustomRepository(ListsRepository)
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
