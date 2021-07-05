import { Request, Response } from 'express'
import { ListProductsDetailsService } from '../services/ListProductsDetailsService'
class ListProductDetailsController {
  async handle(request: Request, response: Response) {
    const { id } = request.params
    const service = new ListProductsDetailsService()

    const listProduct = await service.execute(id)
    return response.json(listProduct)
  }
}

export { ListProductDetailsController }
