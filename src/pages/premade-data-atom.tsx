/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from "next";
import { atom, useAtom, PrimitiveAtom } from "jotai";
import { splitAtom } from "jotai/utils";
import { ChangeEvent } from "react";
import Link from "next/link";

interface Heroes {
  name: string;
}

interface NewHeroes extends Heroes {
  isChecked: boolean;
}

const allHeroes = [
  {
    name: "Batman",
  },
  {
    name: "Superman",
  },
  {
    name: "Wonder Woman",
  },
];

const newHeroes = allHeroes.map((item) => ({ ...item, isChecked: false }));
const dataAtom = atom<NewHeroes[]>(newHeroes);
const heroesAtomsAtom = splitAtom(dataAtom);
const selectedHeroes = atom<string[]>([]);

const Hero = ({ hero }: { hero: PrimitiveAtom<NewHeroes> }) => {
  const [data, setData] = useAtom(hero);
  const [list, setList] = useAtom(selectedHeroes);

  function handleChecklist(e: ChangeEvent<HTMLInputElement>) {
    let updatedList = [...list];
    const { checked, value } = e.target;
    const isInclude = updatedList.includes(value);
    if (checked) {
      if (isInclude) updatedList = [...list];
      if (!isInclude) updatedList = [...list, value];
    }
    if (!checked) {
      updatedList.splice(list.indexOf(value), 1);
    }

    const checkState = updatedList.includes(data.name);

    setList(updatedList);
    setData({ ...data, isChecked: checkState });
  }

  return (
    <li className="flex justify-center gap-2">
      <div>{data.name}</div>
      <input
        type="checkbox"
        value={data.name}
        onChange={handleChecklist}
        checked={data.isChecked}
      />
    </li>
  );
};

const PremadeDataAtomPage: NextPage = () => {
  const [heroes] = useAtom(heroesAtomsAtom);
  const [list] = useAtom(selectedHeroes);

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center">
      <div className="mb-10 flex gap-10 underline">
        <Link href="/">Homepage</Link>
        <Link href="/trpc-atom">tRPC</Link>
      </div>
      <h1 className="mb-4 text-2xl font-semibold">Hard Coded</h1>
      <ul className="text-center leading-loose">
        {heroes.map((hero) => (
          <Hero key={hero as any} hero={hero} />
        ))}
      </ul>
      <div>{list.length !== 0 && JSON.stringify(list)}</div>
    </div>
  );
};

export default PremadeDataAtomPage;
