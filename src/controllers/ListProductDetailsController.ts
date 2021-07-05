import { Request, Response } from 'express'
import { ListProductsDetailsService } from '../services/ListProductsDetailsService'
class ListProductDetailsController {
  async handle(request: Request, response: Response) {
    const { id } = request.params
    const service = new ListProductsDetailsService()
    if (!id) {
      return response.status(400).json({ message: 'Missing informations' })
    }

    const listProduct = await service.execute(id)
    return response.json(listProduct)
  }
}

export { ListProductDetailsController }
