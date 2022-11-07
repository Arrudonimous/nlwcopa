import {PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(){
  const user = await prisma.user.create({
    data:{
      name: 'Jhon Doe',
      email: 'jhon.doe@gmail.com',
      avatarUrl: 'https://github.com/arrudonimous.png',
    }
  })

  const poll = await prisma.poll.create({
    data:{
      title: 'Example poll',
      code: 'BOl123',
      ownerId: user.id,

      participants:{
        create:{
          userId: user.id

        }
      }

    }
  })

  await prisma.game.create({
    data:{
      date: '2022-11-02T12:00:00.776Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
    }
  })

  await prisma.game.create({
    data:{
      date: '2022-11-03T12:00:00.776Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses:{
        create:{
          firstTeamPoints: 2,
          secondTeamPoints: 1,
          participant:{
            connect:{
              userId_pollId:{
                userId: user.id,
                pollId: poll.id,
              }
            }
          }
        }
      }
    }
  })
}

main();