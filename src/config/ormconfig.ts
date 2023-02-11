import path from 'path'
import dotenv from 'dotenv'
dotenv.config()
import { DataSource } from 'typeorm'

const dataSource = new DataSource({
  type: 'postgres',
  host: String(process.env.DB_HOST),
  port: 5432,
  database: String(process.env.DB_DATABASE),
  username: String(process.env.DB_DATABASE),
  password: String(process.env.DB_PASSWORD),
  entities: [path.resolve(__dirname, '..', 'entities', '*.entity.{ts,js}')],
  migrations: [path.resolve(__dirname, '..', 'migrations', '**/*.{ts,js}')],
  logging: true,
  synchronize: false
})

export default dataSource
