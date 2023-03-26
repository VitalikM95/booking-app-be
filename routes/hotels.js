import express from 'express'
import { hotelController } from '../controllers/index.js'
import { isAuth } from '../utils/verifyToken.js'

const router = express.Router()

// router.post('/', isAuth, hotelController.createHotel)
// router.put('/:id', isAuth, hotelController.updateHotel)
// router.delete('/:id', isAuth, hotelController.deleteHotel)
router.get('/find/:id', hotelController.getHotel)

router.get('/', hotelController.getHotels)
router.get('/countByCity', hotelController.countByCity)
router.get('/countByType', hotelController.countByType)
router.get('/room/:id', hotelController.getHotelRooms)

export default router
