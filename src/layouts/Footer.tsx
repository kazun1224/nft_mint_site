import Link from "next/link";
import { FC } from "react";
import { pagesPath } from "src/utils/$path";

export const Footer: FC = () => {
  return (
    <footer className="bg-violet-700 text-white">
      <div className="inner">
        <div className="py-3 md:py-10 text-center">
          <Link href={pagesPath.$url()}>
            <a className="text-lg md:text-xl font-bold">Parallel Space test net</a>
          </Link>
        </div>
      </div>
    </footer>
  );
};
