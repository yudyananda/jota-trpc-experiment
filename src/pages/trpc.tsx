import type { NextPage } from "next";
import Link from "next/link";

import { trpc } from "../utils/trpc";

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
