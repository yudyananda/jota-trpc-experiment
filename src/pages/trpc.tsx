import type { NextPage } from "next";
import Link from "next/link";
import { createAtomCreators } from "jotai-trpc";
import { httpBatchLink, loggerLink } from "@trpc/client";
import superjson from "superjson";

import { trpc, getBaseUrl } from "../utils/trpc";
import { AppRouter } from "../server/trpc/router/_app";
import { publicRouter } from "../server/trpc/router/heroes";

const { atomWithQuery } = createAtomCreators<AppRouter>({
  transformer: superjson,
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === "development" ||
        (opts.direction === "down" && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});

const data = atomWithQuery(publicRouter.heroes);

const TrpcAtomPage: NextPage = () => {
  const { data: heroes } = trpc.public.heroes.useQuery();

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center">
      <div className="mb-10 flex gap-10 underline">
        <Link href="/">Homepage</Link>
        <Link href="/hardcoded">Hard Coded Data</Link>
      </div>
      <h1 className="mb-4 text-2xl font-semibold">tRPC</h1>
      <ul className="text-center leading-loose">
        {heroes?.map((hero) => (
          <li key={hero.name}>{hero.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TrpcAtomPage;
