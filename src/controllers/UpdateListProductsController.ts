import { Request, Response } from 'express'
import { UpdateListProductsService } from '../services/UpadateListProductsService'

class UpdateListProductsController {
  async handle(request: Request, response: Response) {
    const { id, listId, productId, amount, price } = request.body

    const service = new UpdateListProductsService()

    const listProducts = await service.execute({
      id,
      listId,
      productId,
      amount,
      price
    })
    return response.json(listProducts)
  }
}

export { UpdateListProductsController }
