import { EntityRepository, Repository } from 'typeorm'
import { List } from '../entities/List'

@EntityRepository(List)
class ListsRepositories extends Repository<List> {}

export { ListsRepositories }
