import express from 'express'
import { roomController } from '../controllers/index.js'
import { isAuth } from '../utils/verifyToken.js'

const router = express.Router()

// router.post('/:hotelid', isAuth, roomController.createRoom)
// router.put('/:id', isAuth, roomController.updateRoom)
// router.delete('/:id/:hotelid', isAuth, roomController.deleteRoom)
router.get('/', roomController.getRooms)
router.get('/:id', roomController.getRoom)

router.put('/availability/:id', roomController.updateRoomAvailability)

export default router
