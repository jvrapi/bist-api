import { List } from '../entities/List'
import { calculateTotal } from '../utils/calculateTotal'

class ListListsView {
  format(lists: List[]) {
    return lists.map(list => ({
      id: list.id,
      createAt: list.createdAt,
      total: calculateTotal(list.listsProducts)
    }))
  }
}

export { ListListsView }
