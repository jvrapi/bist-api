import { ListProduct } from '../entities/ListProduct'

function calculateTotal(listProducts: ListProduct[]) {
  let total = 0
  listProducts.forEach(item => {
    total += item.price * item.amount
  })
  return total
}

export { calculateTotal }
