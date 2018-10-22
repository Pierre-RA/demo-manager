import * as jwt from 'jsonwebtoken'
import * as mockHttp from 'node-mocks-http'

import { authHandler } from '../../../middlewares'
import { SUCCESS_CODE, UNAUTHORIZED } from '../../../util'

describe('Test middleware: auth', () => {
  test('Empty authorization should return 401', async () => {
    let req = mockHttp.createRequest()
    let res = mockHttp.createResponse()
    let next = () => {}

    await authHandler(req, res, next)

    expect(res.statusCode).toEqual(UNAUTHORIZED)
  })

  test('Wrong authorization should return 401', async () => {
    let req = mockHttp.createRequest({
      headers: {
        authorization: 'asddadas'
      }
    })
    let res = mockHttp.createResponse()
    let next = () => {}

    await authHandler(req, res, next)

    expect(res.statusCode).toEqual(UNAUTHORIZED)
  })

  test('Correct authorization should return 200', async () => {
    const DEFAULT_JWT_SECRET = 'simple-default-jwt-secret'
    const JWT_SECRET = process.env.JWT_SECRET || DEFAULT_JWT_SECRET

    let req = mockHttp.createRequest({
      headers: {
        authorization: jwt.sign({ id: 1 }, JWT_SECRET)
      }
    })
    let res = mockHttp.createResponse()
    let next = () => {}

    await authHandler(req, res, next)

    expect(res.statusCode).toEqual(SUCCESS_CODE)
    expect(req.user).toBeTruthy()
    expect(req.user.id).toBeTruthy()
    expect(req.user.id).toBe(1)
  })
})
