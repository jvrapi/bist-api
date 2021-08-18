import { connection } from '../../typeorm/connection'
import { CreateListService } from '../../src/services/CreateListService'
import { GetListsService } from '../../src/services/GetListsService'

describe('Get Lists', () => {
  let createListService: CreateListService

  let getListsService: GetListsService

  let lists: {
    id: string
    createdAt: Date
    total: number
  }[] = []

  beforeAll(async () => {
    createListService = new CreateListService()
    getListsService = new GetListsService()
    await connection.connect()
  })

  afterAll(async () => {
    await connection.close()
  })
  it('should be able to get empty list', async () => {
    lists = await getListsService.execute()
    expect(lists.length).toEqual(0)
  })

  it('should be able to get list', async () => {
    const list = await createListService.execute()
    expect(list).toHaveProperty('id')

    lists = await getListsService.execute()
    expect(lists.length).toBeGreaterThanOrEqual(1)
  })
})
jest.setTimeout(30000)
