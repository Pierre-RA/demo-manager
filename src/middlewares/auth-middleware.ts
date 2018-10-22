import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

import { UNAUTHORIZED } from '../util/http-codes'

const DEFAULT_JWT_SECRET = 'simple-default-jwt-secret'
const JWT_SECRET = process.env.JWT_SECRET || DEFAULT_JWT_SECRET

export const authHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.hasOwnProperty('headers') &&
    req.headers.hasOwnProperty('authorization')
  ) {
    try {
      req.user = jwt.verify(req.headers.authorization, JWT_SECRET)
      return next()
    }
    catch(err) {
      return res.status(UNAUTHORIZED).json({
        error: `Failed to authenticate: ${err}`
      })
    }
  }
  return res.status(UNAUTHORIZED).json({
    error: 'Failed to authenticate: No token'
  })
}
