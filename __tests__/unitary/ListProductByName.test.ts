import { getCustomRepository } from 'typeorm'

import { ProductsRepository } from '../../src/repositories/ProductsRepository'
import { ListProductByNameService } from '../../src/services/ListProductsByNameService'
import { connection } from '../../typeorm/connection'

describe('List Product By Name', () => {
  let listProductByNameService: ListProductByNameService

  beforeAll(async () => {
    listProductByNameService = new ListProductByNameService()
    await connection.connect()
  })

  afterAll(async () => {
    await connection.close()
  })
  it('should be able to list by product name', async () => {
    // Creating product
    const productRepository = getCustomRepository(ProductsRepository)
    const product = productRepository.create({ name: 'Açúcar' })
    await productRepository.save(product)
    expect(product).toHaveProperty('id')

    // Get product
    const products = await listProductByNameService.execute('acu')
    expect(products.length).toBeGreaterThanOrEqual(1)
  })
})
jest.setTimeout(30000)
