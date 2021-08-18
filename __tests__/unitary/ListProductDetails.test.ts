import { getCustomRepository } from 'typeorm'
import { ProductsRepository } from '../../src/repositories/ProductsRepository'
import { CreateListProductsService } from '../../src/services/CreateListProductsService'
import { CreateListService } from '../../src/services/CreateListService'
import { ListProductsDetailsService } from '../../src/services/ListProductsDetailsService'
import { connection } from '../../typeorm/connection'

describe('List Product Details', () => {
  let createListService: CreateListService
  let createListProductsService: CreateListProductsService
  let listProductsDetailsService: ListProductsDetailsService
  beforeAll(async () => {
    createListService = new CreateListService()
    createListProductsService = new CreateListProductsService()
    listProductsDetailsService = new ListProductsDetailsService()
    await connection.connect()
  })

  afterAll(async () => {
    await connection.close()
  })
  it('should be able to get list product details', async () => {
    // Creating list
    const list = await createListService.execute()
    expect(list).toHaveProperty('id')

    // Creating product
    const productRepository = getCustomRepository(ProductsRepository)
    const product = productRepository.create({ name: 'Açúcar' })
    await productRepository.save(product)
    expect(product).toHaveProperty('id')

    // Creating list products
    const listProducts = await createListProductsService.execute(
      list.id,
      product.id
    )
    expect(listProducts).toHaveProperty('id')

    // Get list products details
    const listProductsDetails = await listProductsDetailsService.execute(
      listProducts.listId
    )
    expect(listProductsDetails.length).toBeGreaterThanOrEqual(1)
    expect(listProductsDetails.shift()).toHaveProperty('id')
  })
})
jest.setTimeout(30000)
