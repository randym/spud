import process from 'process'
import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'local'}` })

export const env = process.env
