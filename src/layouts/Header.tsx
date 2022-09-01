import {
  ActionIcon,
  Burger,
  Button,
  Drawer,
  useMantineColorScheme,
} from "@mantine/core";
import Link from "next/link";
import { FC, useState } from "react";
import { useConnectWallet } from "src/hooks/useConnectWallet";
import { pagesPath } from "src/utils/$path";
import { Moon, Sun } from "tabler-icons-react";

export const Header: FC = () => {
  // themeのセットアップ
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  // wallet接続
  const { address, connectWallet, disconnectWallet } = useConnectWallet();

  //memo drawerの開いているかを確認
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <header>
      <div className="inner">
        <div className="flex items-center justify-between py-5">
          <div>
            <Link href={pagesPath.$url()}>
              <a>
                <h2 className="text-3xl font-bold">Parallel Space</h2>
              </a>
            </Link>
          </div>
          <div className="flex items-center justify-between py-5">
            <div className="hidden sm:block">
              <nav className="flex">
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
              </nav>
            </div>
            {/* テーマの切り替え */}
            <ActionIcon
              variant="outline"
              color={dark ? "blue" : "yellow"}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
              className="mr-1"
            >
              {dark ? <Moon size={18} /> : <Sun size={18} />}
            </ActionIcon>
            {/* walletの接続 */}
            {address ? (
              <Button color="violet" size="md" onClick={disconnectWallet}>
                Connect {address}
              </Button>
            ) : (
              // ウォレット接続ボタン
              <Button color="violet" size="xs" onClick={connectWallet}>
                Connect Metamask Wallet
              </Button>
            )}
          </div>
          <div className="sm:hidden ">
            <Burger onClick={toggleDrawer} opened={isOpen} size={30} />
            <Drawer
              opened={isOpen}
              onClose={toggleDrawer}
              position="right"
              padding="xl"
              size="61%"
            >
              <div>
                <nav className="">
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
                </nav>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
};
