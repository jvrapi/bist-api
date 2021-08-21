import https from 'https'
import { getConnection } from 'typeorm'
import { Product } from '../../entities/Product'
interface JsonData {
  name: string
}
const updateProducts = async () => {
  const options = {
    host: 'api.github.com',
    path: '/gists/9d05f0a49b4088ad3599cfa31f57b234',
    port: 443,
    method: 'GET',
    headers: {
      'User-Agent': 'request'
    }
  }
  let body = ''

  const req = https.request(options, res => {
    res.setEncoding('utf8')

    res.on('data', function (chunk) {
      body = body + chunk
    })
    res.on('end', function () {
      const gistData = JSON.parse(body)
      const products = JSON.parse(gistData.files['products.json'].content)

      const connection = getConnection()
      const repository = connection.getRepository(Product)

      products.forEach(async (product: JsonData) => {
        const productAlreadyExists = await repository.findOne({
          name: product.name
        })
        if (!productAlreadyExists) {
          try {
            const newProduct = repository.create(product)
            await repository.save(newProduct)
          } catch (error) {
            throw new Error('Error when try create a new product' + error)
          }
        }
      })
    })
  })
  req.end()
}

export { updateProducts }
