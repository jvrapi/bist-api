import { Request, Response } from 'express'
import { ListListsService } from '../services/ListListsService'

class ListListsController {
  async handle(request: Request, response: Response) {
    const service = new ListListsService()

    const lists = await service.execute()

    return response.json(lists)
  }
}

export { ListListsController }
