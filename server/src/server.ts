import Fastify from 'fastify';
import cors from '@fastify/cors'
import jwt from '@fastify/jwt';

import { pollRoutes } from './routes/poll';
import { usersRoutes } from './routes/user';
import { guessRoutes } from './routes/guess';
import { authRoutes } from './routes/auth';
import { gameRoutes } from './routes/game';



async function bootstrap(){
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
  })

  await fastify.register(jwt,{
    secret: "nlwcopa",
  })

  fastify.register(pollRoutes);
  fastify.register(authRoutes);
  fastify.register(gameRoutes);
  fastify.register(guessRoutes);
  fastify.register(usersRoutes);


  

  await fastify.listen({ port: 3333,  host: '0.0.0.0'})
}

bootstrap();