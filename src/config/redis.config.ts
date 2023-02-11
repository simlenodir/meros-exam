import * as redis from 'redis'
import { ErrorHandler } from '../exeptions/erroHandler'

export const Client = async () => {
  try {
    const client = redis?.createClient({
      url: 'redis://127.0.0.1:6379'
    })

    client.on('error', (err) => console.log('Redis Client Error', err))
    client.on('error', (err) => {
      throw new ErrorHandler('Error in Redis', 422)
    })
    client.on('connect', () => console.log('Redis Client Connected'))

    await client.connect()

    return client
  } catch (error) {
    console.log(error)
  }
}
