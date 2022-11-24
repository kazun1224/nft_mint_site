import { ActionIcon, Button, useMantineColorScheme } from "@mantine/core";
import Link from "next/link";
import { FC } from "react";
import { DrawerMenu } from "src/components/elements/DrawerMenu";
import { NavMenu } from "src/components/elements/NavMenu";
import { useConnectWallet } from "src/hooks/useConnectWallet";
import { pagesPath } from "src/utils/$path";
import { Moon, Sun } from "tabler-icons-react";

export const Header: FC = () => {
  // themeのセットアップ
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  // wallet接続
  const { address, connectWallet, disconnectWallet } = useConnectWallet();

  // addressの文字列を短くする
  const excerptAddress = (address: string) => {
    const newText = address.slice(-5);
    const excerptText = `...${newText}`;
    return excerptText;
  };

  return (
    <header>
      <div className="inner">
        <div className="flex items-center justify-between py-5">
          <div>
            <Link href={pagesPath.$url()}>

              <h2 className=" text-xl font-bold md:text-3xl">
                Parallel Space
              </h2>

            </Link>
          </div>
          <div className="flex items-center justify-between py-5">
            <NavMenu />
            {/* テーマの切り替え */}
            <ActionIcon
              variant="outline"
              color={dark ? "blue" : "yellow"}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
              className="mr-4"
            >
              {dark ? <Moon size={18} /> : <Sun size={18} />}
            </ActionIcon>
            {/* walletの接続 */}
            {address ? (
              <Button color="violet" size="xs" onClick={disconnectWallet}>
                Connected {excerptAddress(address)}
              </Button>
            ) : (
              // ウォレット接続ボタン
              <Button color="violet" size="xs" onClick={connectWallet}>
                Connect Metamask Wallet
              </Button>
            )}
          </div>
          <DrawerMenu />
        </div>
      </div>
    </header>
  );
};
