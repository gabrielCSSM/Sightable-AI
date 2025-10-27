import { Pool } from 'pg'

const ConnectionDB = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export default ConnectionDB;