import request from 'supertest'
import { app } from '../../src/app'
import { connection } from '../../typeorm/connection'

describe('Request Get List', () => {
  beforeAll(async () => {
    await connection.connect()
  })

  afterAll(async () => {
    await connection.close()
  })
  it('should be able to get empty list', async () => {
    const response = await request(app).get('/list')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.length).toEqual(0)
  })
  it('should be able to get list', async () => {
    await request(app).post('/list')
    const response = await request(app).get('/list')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
  })
})
jest.setTimeout(30000)
