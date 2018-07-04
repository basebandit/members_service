import Hemera from "nats-hemera"
import NatServer from "nats"
import HemeraJoi from "hemera-joi"
import pg from "pg"
import redis from "redis"
import db from "./db"
import dotenv from "dotenv"
import router from "./router"

dotenv.config()

const {
  DATABASE_USER,
  DATABASE_PASS,
  DATABASE_HOST,
  DATABASE_PORT,
  REDIS_HOST,
  REDIS_PORT
} = process.env

const redisClient = redis.createClient(REDIS_PORT, REDIS_HOST)

const nats = NatServer.connect() //local

const pool = new pg.Pool({
  user: DATABASE_USER,
  host: DATABASE_HOST,
  database: "postgres",
  port: DATABASE_PORT,
  password: DATABASE_PASS,
  ssl: !DATABASE_PASS
})

const hemera = new Hemera(nats, {
  logLevel: "silent"
})

hemera.use(HemeraJoi)

const start = async () => {
  await hemera.ready()
  const locals = {
    hemera,
    pool,
    redisClient
  }
  const routes = await router(locals)

  Object.keys(routes).map(topic =>
    routes[topic].map(instruction => {
      const { resolver } = instruction
      Object.assign(instruction, {
        topic,
        resolver: null
      })
      hemera.add(instruction, async (...ops) => resolver(...ops))
    })
  )
  await db(locals)
}

start()
