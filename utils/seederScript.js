import dotenv from 'dotenv'
import connectDB from '../config/db.js'
import hotelsData from '../data/hotelsData.js'
import Hotel from '../models/Hotel.js'

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await Hotel.deleteMany({})

    await Hotel.insertMany(hotelsData)

    console.log('Data Import Success')

    process.exit()
  } catch (error) {
    console.error('Data import Error', error)
    process.exit(1)
  }
}

importData()
