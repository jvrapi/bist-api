import { getCustomRepository } from 'typeorm'
import { ProductsRepository } from '../../src/repositories/ProductsRepository'
import { CreateListProductsService } from '../../src/services/CreateListProductsService'
import { CreateListService } from '../../src/services/CreateListService'
import { DeleteListService } from '../../src/services/DeleteListService'
import { connection } from '../../typeorm/connection'

describe('Delete List', () => {
  let createListService: CreateListService
  let createListProductsService: CreateListProductsService
  let deleteListsService: DeleteListService

  beforeAll(async () => {
    createListService = new CreateListService()
    createListProductsService = new CreateListProductsService()
    deleteListsService = new DeleteListService()
    await connection.connect()
  })

  afterAll(async () => {
    await connection.close()
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
})
jest.setTimeout(30000)
