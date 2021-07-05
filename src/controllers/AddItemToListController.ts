import { Request, Response } from 'express'
import { AddItemToListService } from '../services/AddItemToListService'

class AddItemToListController {
  async handle(request: Request, response: Response) {
    const { listId, productId } = request.body
    const addItemToListService = new AddItemToListService()
    if (!listId || !productId) {
      return response.status(400).json({ message: 'Missing Informations' })
    }
    const itemAdded = await addItemToListService.execute(listId, productId)

    return response.status(200).json(itemAdded)
  }
}
export { AddItemToListController }
