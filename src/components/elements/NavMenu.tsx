import { NavLink } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

import { pagesPath } from "src/utils/$path";

export const NavMenu: FC = () => {
  const router = useRouter();

  return (
    <div className="mr-4 hidden sm:block">
      <nav className="flex">
        <Link href={pagesPath.$url()}>
          <NavLink
            component="a"
            label="Home"
            active={router.pathname === pagesPath.$url().pathname}
            color="violet"
            className="mr-2 rounded-lg px-5 py-2 text-lg font-bold"
          />
        </Link>
        <Link href={pagesPath.collection.$url()}>
          <NavLink
            component="a"
            label="Collection"
            active={router.pathname === pagesPath.collection.$url().pathname}
            color="violet"
            className="mr-2 rounded-lg px-5 py-2 text-lg font-bold"
          />
        </Link>
        <Link href={pagesPath.owner.$url()}>
          <NavLink
            component="a"
            label="Owner"
            active={router.pathname === pagesPath.owner.$url().pathname}
            color="violet"
            className="mr-2 rounded-lg px-5 py-2 text-lg font-bold"
          />
        </Link>
      </nav>
    </div>
  );
};
