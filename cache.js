export default async ({ hemera }) => {
  const { joi } = hemera

  hemera.add(
    {
      topic: "rmbr",
      cmd: "refresh_cache",
      user: joi.number().required()
    },
    ({ address }) =>
      new Promise(async resolve => {
        // init cache for the member
      })
  )
}
