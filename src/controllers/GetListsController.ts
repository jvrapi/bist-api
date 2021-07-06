import { Request, Response } from 'express'
import { GetListsService } from '../services/GetListsService'

class GetListsController {
  async handle(request: Request, response: Response) {
    const service = new GetListsService()

    const lists = await service.execute()

    return response.json(lists)
  }
}

export { GetListsController }
