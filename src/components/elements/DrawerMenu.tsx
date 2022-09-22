import { Burger, Drawer, NavLink } from "@mantine/core";
import Link from "next/link";
import { FC, useState } from "react";
import { pagesPath } from "src/utils/$path";
import { useRouter } from "next/router";

export const DrawerMenu: FC = () => {
  const router = useRouter();
  //memo drawerの開いているかを確認
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <div className="fixed bottom-10 right-5 z-50 rounded-full bg-violet-700 p-3 sm:hidden">
      <Burger onClick={toggleDrawer} opened={isOpen} size={30} color="white" />
      <Drawer
        opened={isOpen}
        onClose={toggleDrawer}
        position="right"
        padding="xl"
        size="61%"
      >
        <nav className="p-5">
          <Link href={pagesPath.$url()}>
            <NavLink
              component="a"
              label="Home"
              active={router.pathname === pagesPath.$url().pathname}
              color="violet"
            />
          </Link>
          <Link href={pagesPath.collection.$url()}>
            <NavLink
              component="a"
              label="Collection"
              active={router.pathname === pagesPath.collection.$url().pathname}
              color="violet"
            />
          </Link>
          <Link href={pagesPath.owner.$url()}>
            <NavLink
              component="a"
              label="Owner"
              active={router.pathname === pagesPath.owner.$url().pathname}
              color="violet"
            />
          </Link>
        </nav>
      </Drawer>
    </div>
  );
};
