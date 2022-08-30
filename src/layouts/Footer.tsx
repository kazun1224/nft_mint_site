import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import Link from "next/link";
import { FC } from "react";
import { pagesPath } from "src/utils/$path";
import { Moon, Sun } from "tabler-icons-react";

export const Footer: FC = () => {
  // themeのセットアップ
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <footer className="bg-gray-800 text-white">
      <div className="mx-auto w-full max-w-screen-lg px-5 md:px-20">
        <div className="flex items-center justify-between py-5">
          <div>
            <Link href={pagesPath.$url()}>
              <a>
                <h2 className="text-3xl font-bold">Parallel Space test net</h2>
              </a>
            </Link>
          </div>
          <div className="flex items-center justify-between py-5">
            <nav className="flex">
              <Link href={pagesPath.mint.$url()}>
                <a>
                  <h2 className="p-5 text-lg font-bold">mint</h2>
                </a>
              </Link>

              <Link href={pagesPath.start.$url()}>
                <a>
                  <h2 className="p-5 text-lg font-bold">start</h2>
                </a>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
