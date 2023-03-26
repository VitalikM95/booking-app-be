import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { createError } from '../utils/error.js'

const generateAccessToken = (id, isAdmin) => {
  const payload = {
    id,
    isAdmin,
  }
  return jwt.sign(payload, process.env.JWT, { expiresIn: '30d' })
}

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const checkUser = await User.findOne({ username })
    if (checkUser) {
      return next(createError(400, 'User already exist'))
    }
    const checkEmail = await User.findOne({ email })
    if (checkEmail) {
      return next(createError(400, 'Email already registered'))
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const doc = new User({
      username: req.body.username,
      email: req.body.email,
      passwordHash: hash,
      country: req.body.country,
      city: req.body.city,
      phone: req.body.phone,
    })

    const newUser = await doc.save()

    const token = generateAccessToken(newUser._id, newUser.isAdmin)

    const { passwordHash, ...userData } = newUser._doc

    res.status(200).json({
      ...userData,
      token,
    })
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) return next(createError(400, 'User not found!'))

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user._doc.passwordHash
    )

    if (!isPasswordCorrect) {
      return next(createError(400, 'Wrong password or username!'))
    }

    const token = generateAccessToken(user._id, user.isAdmin)

    const { passwordHash, ...userData } = user._doc

    res.json({
      ...userData,
      token,
    })
  } catch (err) {
    next(err)
  }
}
