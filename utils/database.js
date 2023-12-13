import mongoose from 'mongoose'

let isConnected = false // track the connection

export const connectToDB = async () => {
  // throw error when attempting to query on fields that are not defined in schema
  mongoose.set('strictQuery', true)

  if (isConnected) {
    console.log('MongoDB is already connected')
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'share_prompt',
    })

    isConnected = true

    console.log('MongoDB connected')
  } catch(error) {
    console.log(error)
  }
}