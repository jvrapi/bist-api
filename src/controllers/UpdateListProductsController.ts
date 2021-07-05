import { Request, Response } from 'express'
import { UpdateListProductsService } from '../services/UpadateListProductsService'

class UpdateListProductsController {
  async handle(request: Request, response: Response) {
    const { id, listId, productId, amount, price } = request.body

    const service = new UpdateListProductsService()
    if (!id || !listId || !productId) {
      return response.status(400).json({ message: 'Missing informations' })
    }
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
