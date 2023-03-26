import express from 'express'
import { userController } from '../controllers/index.js'
import { isAuth } from '../utils/verifyToken.js'

const router = express.Router()

router.put('/:id', isAuth, userController.updateUser)
router.delete('/:id', isAuth, userController.deleteUser)
router.get('/:id', isAuth, userController.getUser)
router.get('/', isAuth, userController.getUsers)

export default router
