import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="container flex min-h-screen flex-col items-center justify-center">
      <div className="mb-10 flex gap-10 underline">
        <Link href="/hardcoded">Hard Coded</Link>
        <Link href="/trpc">tRPC</Link>
      </div>
      <h1 className="mb-4 text-2xl font-semibold">Jotai SplitAtom</h1>
    </div>
  );
};

export default Home;
