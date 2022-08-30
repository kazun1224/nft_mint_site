import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import {
  ChainId,
  ConnectWallet,
  ThirdwebNftMedia,
  useAddress,
  useChainId,
  useMetamask,
  useMintNFT,
  useNetwork,
  useNetworkMismatch,
  useNFT,
  useNFTCollection,
  Web3Button,
} from "@thirdweb-dev/react";
import type { CustomNextPage } from "next";
import { useEffect } from "react";
import { Layout } from "src/layouts";
import { Moon, Sun } from "tabler-icons-react";

const Home: CustomNextPage = () => {
  // themeのセットアップ
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  // NFT表示
  const contract = useNFTCollection(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const { data: nft, isLoading } = useNFT(contract, 3);
  console.log(contract?.mint);

  // ネットワークの検知と変更
  const isMismatched = useNetworkMismatch();
  const connectWithMetamask = useMetamask(); // Connect wallet with Metamask
  const [, switchNetwork] = useNetwork();
  const address = useAddress(); // Get connected wallet address
  useEffect(() => {
    if (isMismatched) {
      switchNetwork(ChainId.Mumbai);
    }
  }, [address]);

  // ウォレットが接続されているネットワークのチェーン ID
  const chainId = useChainId();

  // mint のロジック
  // const { contract } = useContract(<ContractAddress>);
  // const {
  //   mutate: mintNft,
  //   isLoading,
  //   error,
  // } = useMintNFT(contract?.nft);

  // if (error) {
  //   console.error("failed to mint nft", error);
  // }


  return (
    <div >

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

      {/* mint button

      <button
      disabled={isLoading}
      onClick={() => mintNft({ name: "My awesome NFT!", to: "0x..." })}
    >
      Mint!
    </button> */}
     {/* <div>
      <Web3Button contractAddress="0x..." functionName="mint" />
    </div> */}
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;

    function mintNft(arg0: { name: string; to: string; }): void {
      throw new Error("Function not implemented.");
    }

