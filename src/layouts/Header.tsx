import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import Link from "next/link";
import { FC } from "react";
import { pagesPath } from "src/utils/$path";
import { Moon, Sun } from "tabler-icons-react";

export const Header: FC = () => {
  // themeのセットアップ
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <header>
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
              <Link href={pagesPath.collection.$url()}>
                <a>
                  <h2 className="p-5 text-lg font-bold">collection</h2>
                </a>
              </Link>
              <Link href={pagesPath.owner.$url()}>
                <a>
                  <h2 className="p-5 text-lg font-bold">owner</h2>
                </a>
              </Link>
              <Link href={pagesPath.start.$url()}>
                <a>
                  <h2 className="p-5 text-lg font-bold">start</h2>
                </a>
              </Link>
            </nav>

            <ActionIcon
              variant="outline"
              color={dark ? "blue" : "yellow"}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? <Moon size={18} /> : <Sun size={18} />}
            </ActionIcon>
          </div>
        </div>
      </div>
    </header>
  );
};
