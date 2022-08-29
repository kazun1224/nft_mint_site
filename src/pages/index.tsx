import { ActionIcon, Button, useMantineColorScheme } from "@mantine/core";
import {
  ChainId,
  ConnectWallet,
  ThirdwebNftMedia,
  useAddress,
  useChainId,
  useMetamask,
  useNetwork,
  useNetworkMismatch,
  useNFT,
  useNFTCollection,
  useNFTDrop,
} from "@thirdweb-dev/react";
import type { CustomNextPage, NextPage } from "next";
import { useEffect } from "react";
import { Layout } from "src/layouts";
import { Moon, Sun } from "tabler-icons-react";

const Home: CustomNextPage = () => {
  // themeのセットアップ
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  // 表示
  const contract = useNFTCollection(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const { data: nft, isLoading } = useNFT(contract, 0);
  console.log(nft);

  // ネットワークの検知と変更
  const isMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const address = useAddress(); // Get connected wallet address
  const connectWithMetamask = useMetamask(); // Connect wallet with Metamask
  useEffect(() => {
    if (isMismatched) {
      switchNetwork(ChainId.Mumbai);
    }
  }, [address]);

  // ウォレットが接続されているネットワークのチェーン ID
  const chainId = useChainId();
  // 全体的なデータ
  // const nftDrop = useNFTDrop(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  return (
    <div className="p-20 ">
      <ActionIcon
        variant="outline"
        color={dark ? "blue" : "yellow"}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {dark ? <Moon size={18} /> : <Sun size={18} />}
      </ActionIcon>
      <div>
        {/* ウォレット接続ボタン */}
        <ConnectWallet
          colorMode={dark ? "dark" : "light"}
          accentColor="#F213A4"
        />
        {/* mintされる前のNFTを表示 */}
        {!isLoading && nft ? (
          <ThirdwebNftMedia metadata={nft.metadata} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <hr />
      {/* ネットワークの検知 */}
      {isMismatched && (
        <button onClick={() => switchNetwork(ChainId.Mumbai)}>
          Switch Network
        </button>
      )}
      {address ? (
        <h4>Connected as {address}</h4>
      ) : (
        <button onClick={connectWithMetamask}>Connect Metamask Wallet</button>
      )}
      <hr />
      <div>{chainId}</div>
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
