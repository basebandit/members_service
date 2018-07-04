import resolvers from "./resolvers"

export default async (...ops) => {
  const { hemera } = ops[0]
  const { joi } = hemera
  const { create_user, fetch_user } = await resolvers(...ops)
  const router = {
    //member actions
    "members": [
      {
        cmd: "create",
        resolver: create_user,
        address: joi.string().required(),
        fname: joi.string().required(),
        mname: joi.string().required(),
        lname: joi.string().required()
      },
      {
        cmd: "fetch",
        resolver: fetch_user,
        address: joi.string().required()
      }
    ]
  }
  return router
}
