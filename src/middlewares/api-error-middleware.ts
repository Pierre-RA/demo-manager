import { NextFunction, Request, Response } from 'express'

import { ApiError } from '../errors'
import { INTERNAL_SERVER_ERROR } from '../util/http-codes'

export const apiErrorHandler = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = (err as ApiError).status || INTERNAL_SERVER_ERROR
  res.statusCode = status

  // istanbul ignore next
  if (
    process.env.NODE_ENV !== 'test' &&
    status >= INTERNAL_SERVER_ERROR
  ) {
    console.error(err.stack)
  }

  res.json({
    error: err.message,
    status
  })
}
