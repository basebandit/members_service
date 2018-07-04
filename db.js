export default async ({ pool }) => {
  try {
    await pool.query("CREATE SCHEMA IF NOT EXISTS members;")

    await pool.query(`CREATE TABLE IF NOT EXISTS members.registered_members(
     "address" VARCHAR PRIMARY KEY ,
     "fname" VARCHAR NOT NULL,
      "mname" VARCHAR NOT NULL,
      "lname" VARCHAR NOT NULL
    );`)
  } catch (error) {
    console.log(error)
  }
}
