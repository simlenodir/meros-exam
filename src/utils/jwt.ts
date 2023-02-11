import jwt from 'jsonwebtoken'
import dotenv from 'dotenv/config'

export default {
  sign: (payload: string) => jwt.sign(payload, String(process.env.SECRET_KEY)),
  verify: (payload: string) => jwt.verify(payload, String(process.env.SECRET_KEY))
}
