// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { publicRouter } from "./heroes";

export const appRouter = router({
  public: publicRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
