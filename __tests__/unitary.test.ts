import { getCustomRepository } from 'typeorm'
import {
  clearDatabase,
  closeConnection,
  createTestConnection
} from '../src/database'
import { ProductsRepository } from '../src/repositories/ProductsRepository'
import { CreateListProductsService } from '../src/services/CreateListProductsService'
import { CreateListService } from '../src/services/CreateListService'
import { DeleteListsService } from '../src/services/DeleteListsService'
import { GetListsService } from '../src/services/GetListsService'

describe('Unit tests', () => {
  let createListService: CreateListService
  let createListProductsService: CreateListProductsService
  let deleteListsService: DeleteListsService
  let getListsService: GetListsService

  beforeAll(() => {
    createListService = new CreateListService()
    createListProductsService = new CreateListProductsService()
    deleteListsService = new DeleteListsService()
    getListsService = new GetListsService()
  })
  beforeEach(async () => {
    await createTestConnection()
  })

  afterEach(async () => {
    await clearDatabase()
    closeConnection()
  })
  it('should be able to create a list', async () => {
    const createList = await createListService.execute()
    expect(createList).toHaveProperty('id')
  })

  it('should be able to create a list product', async () => {
    // Creating list
    const list = await createListService.execute()
    expect(list).toHaveProperty('id')

    // Creating product
    const productRepository = getCustomRepository(ProductsRepository)
    const product = productRepository.create({ name: 'Açúcar' })
    await productRepository.save(product)
    expect(product).toHaveProperty('id')

    // Creating list products
    const listProduct = await createListProductsService.execute(
      list.id,
      product.id
    )
    expect(listProduct).toHaveProperty('id')
  })

  it('should be able to delete a list', async () => {
    // Creating list
    const list = await createListService.execute()

    // Creating product
    const productRepository = getCustomRepository(ProductsRepository)
    const product = productRepository.create({ name: 'Açúcar' })
    await productRepository.save(product)

    // Creating list products
    const listProduct = await createListProductsService.execute(
      list.id,
      product.id
    )

    // Deleting list
    const deletedList = await deleteListsService.execute(list.id)

    // Create list tests
    expect(list).toHaveProperty('id')

    // Create product test
    expect(product).toHaveProperty('id')

    // Create list product test
    expect(listProduct).toHaveProperty('id')

    // Delete list test
    expect(deletedList).toHaveProperty('message')
    expect(deletedList.message).toEqual('List deleted')
  })

  it('should be able to get list', async () => {
    let lists: {
      id: string
      createdAt: Date
      total: number
    }[] = []

    // getting lists without data
    lists = await getListsService.execute()
    expect(lists.length).toEqual(0)

    // Creating list
    const list = await createListService.execute()
    expect(list).toHaveProperty('id')

    // getting lists with data
    lists = await getListsService.execute()
    expect(lists.length).toBeGreaterThan(0)
  })
})
