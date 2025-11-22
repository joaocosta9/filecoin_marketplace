import fastify from "fastify";
import { getUserProducts, saveProduct, saveUser } from "./db/user.js";

const server = fastify();

server.get("/ping", async (request, reply) => {
  return "pong\n";
});

server.post("/save-product", async (request, reply) => {
  const { cid, address } = (await request.body) as {
    cid: string;
    address: string;
  };
  await saveUser(address);
  await saveProduct(cid, address);
  return "Product saved\n";
});

server.get("/get-products", async (request, reply) => {
  const { address } = request.query as {
    address: string;
  };
  const products = await getUserProducts(address);
  return products;
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
