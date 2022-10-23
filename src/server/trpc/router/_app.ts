// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { heroesRouter } from "./heroes";

export const appRouter = router({
  public: heroesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
