import request from 'supertest'
import { app } from '../../src/app'
import { connection } from '../../typeorm/connection'

describe('Request Create List', () => {
  beforeAll(async () => {
    await connection.connect()
  })

  afterAll(async () => {
    await connection.close()
  })
  it('should be able to create a new list request', async () => {
    const response = await request(app).post('/list')
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(typeof response.body).toBe('object')
  })
})
jest.setTimeout(30000)
