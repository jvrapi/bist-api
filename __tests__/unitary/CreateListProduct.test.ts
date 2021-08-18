import { getCustomRepository } from 'typeorm'
import { ProductsRepository } from '../../src/repositories/ProductsRepository'
import { CreateListProductsService } from '../../src/services/CreateListProductsService'
import { CreateListService } from '../../src/services/CreateListService'
import { connection } from '../../typeorm/connection'

describe('Create List Product', () => {
  let createListService: CreateListService
  let createListProductsService: CreateListProductsService

  beforeAll(async () => {
    createListService = new CreateListService()
    createListProductsService = new CreateListProductsService()
    await connection.connect()
  })

  afterAll(async () => {
    await connection.close()
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
})
jest.setTimeout(30000)
