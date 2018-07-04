import resolvers from "./resolvers"

export default async (...ops) => {
  const { hemera } = ops[0]
  const { joi } = hemera
  const { create_user, fetch_user } = await resolvers(...ops)
  const router = {
    members: [
      {
        cmd: "create",
        resolver: create_user,
        profile: joi.string().required()
      },
      {
        cmd: "fetch",
        resolver: fetch_user,
        registrationTime: joi.string().required()
      }
    ]
  }
  return router
}
