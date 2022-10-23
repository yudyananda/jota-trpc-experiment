import { router, publicProcedure } from "../trpc";

export const heroesRouter = router({
  heroes: publicProcedure.query(({ctx}) => {
    return ctx.prisma.heroes.findMany({
      select: {
        name: true
      }
    })
  })
})