import express from 'express';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import environments from './config/environments';
// import { PrismaClient } from '@prisma/client';
import { createContext } from './context';
import expressPlayground from 'graphql-playground-middleware-express';

if (process.env.NODE_ENV !== 'production') {
  const envs = environments;
}

async function main() {
  const app = express();
  app.use('*', cors());
  app.use(compression());
  const server = new ApolloServer({
    schema,
    context: createContext,
    introspection: true,
    playground: false,
  });
  server.applyMiddleware({ app });

  app.use(
    '/',
    expressPlayground({
      endpoint: '/graphql',
    })
  );

  const PORT = process.env.PORT || 5300;
  const httpServer = createServer(app);
  httpServer.listen({ port: PORT }, () =>
    console.log(
      `Sistema de Autenticación JWT API GraphQL http://localhost:${PORT}/graphql`
    )
  );
  // const PORT = process.env.PORT || 5300;
  // const httpServer = createServer(app);
  // httpServer.listen({ port: PORT }, () =>
  //   console.log(`🚀 Server on http://localhost:${PORT}/graphql`)
  // );
}

main();
