import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { authenticate } from "../plugins/authenticate";


export async function gameRoutes(fastify : FastifyInstance){

  fastify.get('/polls/:id/games',{
    onRequest: [authenticate],
  }, async(request)=>{

    const getPoolParams = z.object({
      id: z.string(),
    })

    const { id } = getPoolParams.parse(request.params);

    const games = await prisma.game.findMany({
      orderBy:{
        date: 'desc'
      },
      include:{
        guesses:{
          where:{
            participant:{
              id: request.user.sub,
              pollId: id,
            }
          }
        }
      }
    })

    return { 
      games: games.map(game =>{
        return{
          ...game,
          guess: game.guesses.length > 0 ? game.guesses[0] : null,
          guesses: undefined,
        }
      })
    }
  })

}