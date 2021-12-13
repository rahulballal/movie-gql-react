import "reflect-metadata";
import Fastify from "fastify";
import mercurius from "mercurius";
import { getGQLSchema, IContext } from "./graphql-resolvers";

async function main() {
  const app = Fastify({ logger: process.env.NODE_ENV === 'production' });
  const schema = await getGQLSchema();
  app.register(mercurius, {
    routes: true,
    schema,
    graphiql: process.env.NODE_ENV !== "production",
    context: async (req, res): Promise<IContext> => {
        return {
            hostName: req.hostname
        }
    }
  });
  app.get("/healthz", async (_req, reply) => {
    reply.send({ message: "Yes" });
  });

  return app;
}

main()
  .then((app) => {
    return app.listen(8080);
  })
  .then(() => {
    console.info("GQL Server started at http://localhost:8080");
  })
  .catch(console.error);
