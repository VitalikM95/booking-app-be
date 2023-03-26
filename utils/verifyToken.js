import jwt from 'jsonwebtoken'
import { createError } from '../utils/error.js'

export const isAuth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT)

      req.userId = decoded._id
      next()
    } catch (err) {
      next(err)
    }
  } else {
    return next(createError(401, 'You are not authenticated!'))
  }
}
