import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const TrpcAtomPage: NextPage = () => {
  const { data: heroes } = trpc.public.heroes.useQuery();

  return (
    <div>
      {heroes?.map((hero) => (
        <div key={hero.name}>{hero.name}</div>
      ))}
    </div>
  );
};

export default TrpcAtomPage;
