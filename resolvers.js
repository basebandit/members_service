import { promisify } from "util"

export default async ({ hemera, pInsert, pool, redisClient }) => {
  const { log } = hemera
  //Lets promisify redis
  let hset = promisify(redisClient.hset).bind(redisClient)
  let hget = promisify(redisClient.hget).bind(redisClient)

  const create_user = async ({ address, fname, mname, lname }) => {
    const timestamp = Math.floor(Date.now() / 1000) //current timestamp or epoch time or Unix timestamp
    //in seconds (Total seconds since 1970/01/01)

    //insert into postgres
    await pool.query(
      "INSERT INTO members.registered_members VALUES ($1,$2,$3,$4)",
      [address, fname, mname, lname]
    )

    //insert into redis hash
    await hset("registered-members", address, timestamp)

    return timestamp //time user was registered
  }
  //fetch user timestamp from redis hash set using address as key
  const fetch_user = async ({ address }) =>
    await hget("registered-members", address)

  return {
    create_user,
    fetch_user
  }
}
