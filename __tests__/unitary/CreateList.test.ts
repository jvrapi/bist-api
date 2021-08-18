import { CreateListService } from '../../src/services/CreateListService'
import { connection } from '../../typeorm/connection'

describe('Create List', () => {
  let createListService: CreateListService

  beforeAll(async () => {
    createListService = new CreateListService()
    await connection.connect()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should be able to create a list', async () => {
    const createList = await createListService.execute()
    expect(createList).toHaveProperty('id')
  })
})
jest.setTimeout(30000)
