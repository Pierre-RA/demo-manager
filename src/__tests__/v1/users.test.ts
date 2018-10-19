import MongoMemoryServer from 'mongodb-memory-server'
import * as mongoose from 'mongoose'
import * as request from 'supertest'

import app from '../../app'
// import { User } from '../../models'
import { BAD_REQUEST, SUCCESS_CODE } from '../../util/http-codes'

describe('Test route /users', () => {
  let mongod

  beforeAll(async () => {
    mongod = new MongoMemoryServer()
    const mongoURI = await mongod.getConnectionString()
    mongoose.Promise = global.Promise
    await mongoose.connect(mongoURI, { useNewUrlParser: true })
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongod.stop()
  })

  test('GET /users/1bc08237eecd0339ee092a17 should return status 400', async () => {
    const response = await request(app).get('/v1/users/1bc08237eecd0339ee092a17')
    expect(response.statusCode).toBe(BAD_REQUEST)
    expect(response.body).toEqual({
      error: 'No user found with id: 1bc08237eecd0339ee092a17',
      status: 400
    })
  })

  test('GET /users should return {}', async () => {
    const response = await request(app).get('/v1/users')
    expect(response.statusCode).toBe(SUCCESS_CODE)
    expect(response.body).toEqual({
      users: []
    })
  })

  test('Batch routes', async () => {
    const createResponse = await request(app).post('/v1/users')
      .send({
        createdAt: new Date(),
        email: 'an email'
      })
    expect(createResponse.statusCode).toBe(SUCCESS_CODE)
    const id = createResponse.body._id
    expect(id).toBeTruthy()

    const getListResponse = await request(app).get('/v1/users')
    expect(getListResponse.statusCode).toBe(SUCCESS_CODE)
    expect(getListResponse.body.users).toBeTruthy()
    expect(getListResponse.body.users.length).toEqual(1)

    const getUserResponse = await request(app).get(`/v1/users/${id}`)
    expect(getUserResponse.statusCode).toBe(SUCCESS_CODE)
    expect(getUserResponse.body.email).toBeTruthy()
    expect(getUserResponse.body.email).toEqual('an email')

    const updated = {
      email: 'new@email.test',
      createdAt: createResponse.body.date
    }
    const updateUserResponse = await request(app).put(`/v1/users/${id}`)
      .send(updated)
    expect(updateUserResponse.statusCode).toBe(SUCCESS_CODE)
    expect(updateUserResponse.body.email).toBeTruthy()
    expect(updateUserResponse.body.email).toEqual('new@email.test')

    const deleteUserResponse = await request(app).delete(`/v1/users/${id}`)
    expect(deleteUserResponse.statusCode).toBe(SUCCESS_CODE)

    const deleteFailedUserResponse = await request(app).delete(`/v1/users/${id}`)
    expect(deleteFailedUserResponse.statusCode).toBe(BAD_REQUEST)

    const updateFailedUserResponse = await request(app).put(`/v1/users/${id}`)
      .send(updated)
    expect(updateFailedUserResponse.statusCode).toBe(BAD_REQUEST)
    expect(updateFailedUserResponse.body).toEqual({
      error: `No user found with id: ${id}`,
      status: 400
    })
  })
})
