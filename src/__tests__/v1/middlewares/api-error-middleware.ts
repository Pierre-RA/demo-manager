import * as mockHttp from 'node-mocks-http'

import { ApiError } from '../../../errors';
import { apiErrorHandler } from '../../../middlewares'
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../../../util'


describe('Test middleware: api Error', () => {
  test('Should show internal server error', async () => {
    const err = new Error('fail')
    let req = mockHttp.createRequest()
    let res = mockHttp.createResponse()
    let next = () => {}

    await apiErrorHandler(err, req, res, next)

    const data = JSON.parse(res._getData())

    expect(res.statusCode).toEqual(INTERNAL_SERVER_ERROR)
    expect(data).toEqual({
      error: 'fail',
      status: INTERNAL_SERVER_ERROR
    })
  })

  test('Should show internal server error', async () => {
    const err = new ApiError(BAD_REQUEST, 'fail')
    let req = mockHttp.createRequest()
    let res = mockHttp.createResponse()
    let next = () => {}

    await apiErrorHandler(err, req, res, next)

    const data = JSON.parse(res._getData())

    expect(res.statusCode).toEqual(BAD_REQUEST)
    expect(data).toEqual({
      error: 'fail',
      status: BAD_REQUEST
    })
  })
})
