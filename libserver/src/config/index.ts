import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI:string = `${process.env.MONGODB_URI}`

const PORT:number = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8000

const ROUNDS:number = process.env.HASH_ROUNDS ? Number(process.env.HASH_ROUNDS) : Math.floor(Math.random() * 11)

export const config = {
    mongo: {
        url: MONGODB_URI
    },
    server: {
        port: PORT,
        rounds: ROUNDS
    }
}
