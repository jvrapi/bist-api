import { EntityRepository, Repository } from 'typeorm'
import { List } from '../entities/List'

@EntityRepository(List)
class ListsRepository extends Repository<List> { }

export { ListsRepository }
