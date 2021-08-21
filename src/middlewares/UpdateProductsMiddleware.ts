import { Request, Response, NextFunction } from 'express'
import { updateProducts } from '../utils/typeorm/updateProducts'
const UpdateProductsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await updateProducts()
  next()
}

export { UpdateProductsMiddleware }
