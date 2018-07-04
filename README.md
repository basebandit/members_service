# members_service

A microservice for braiven exchange to verify users

# Run

```bash
docker pull gnatsd

docker run -p 4222:4222 -p 8222:8222 -p 6222:6222 --name gnatsd -ti nats:latest

npm start
```
