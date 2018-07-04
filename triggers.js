import Hemera from "nats-hemera"
import NatServer from "nats"
import HemeraJoi from "hemera-joi"

const nats = NatServer.connect()

const hemera = new Hemera(nats, {
  logLevel: "info",
  tag: "rmbr"
})

const address = "Nairobi Uthiru 247"

const main = async () => {
  const { log } = hemera
  const { data: createMember } = hemera.act({
    topic: "members",
    cmd: "create",
    //the users id from the larger system
    address: address,
    fname: "Evanson",
    mname: "Mwangi",
    lname: "Wainaina"
  })
  console.log("create member", createMember)

  const { data: createdMember } = await hemera.act({
    topic: "members",
    cmd: "fetch",
    address: address
  })
  console.log("fetch user", createdMember)
}
try {
  main()
} catch (error) {
  console.log(error)
}
