const request = require('supertest')
const app = require('../../app')

const NEW_PART = {
  "name": `PART Name ${new Date()}`,
  "sku": "DCMM39823DSSW",
  "description": "Description of new part",
  "weight_ounces": "30",
  "is_active": "1"
}

describe('GET /parts', () => {
  test('Should return all parts', async () => {
    const response = await request(app).get('/parts')

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
  })
})

describe('POST /parts', () => {
  test('Should create new part', async () => {
    const response = await request(app).post('/parts').send(NEW_PART)

    expect(response.statusCode).toBe(201)
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
  })

  test('Should not create new part if name is missing', async () => {
    const response = await request(app).post('/parts').send({
      "sku": "DCMM39823DSSW",
      "description": "Description of new part",
      "weight_ounces": "30",
      "is_active": "1"
    })

    expect(response.statusCode).toBe(400)
  })

  test('Should not create new part if part already exists', async () => {
    await request(app).post('/parts').send(NEW_PART)
    const response = await request(app).post('/parts').send(NEW_PART)

    expect(response.statusCode).toBe(400)
  })
})
