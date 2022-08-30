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
} from "@thirdweb-dev/react";
import type { CustomNextPage } from "next";
import { useEffect } from "react";
import { Layout } from "src/layouts";

const Home: CustomNextPage = () => {
  // NFT表示
  const contract = useNFTCollection(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const { data: nft, isLoading } = useNFT(contract, 3);

  // ネットワークの検知と変更
  const isMismatched = useNetworkMismatch();
  const connectWithMetamask = useMetamask(); // Connect wallet with Metamask
  const [, switchNetwork] = useNetwork();
  const address = useAddress(); // Get connected wallet address
  useEffect(() => {
    if (isMismatched) {
      switchNetwork && switchNetwork(ChainId.Mumbai);
    }
  }, [address, isMismatched, switchNetwork]);

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
    <div>
      <div>
        {/* ウォレット接続ボタン */}
        <ConnectWallet colorMode="light" accentColor="#F213A4" />
        {/* mintされる前のNFTを表示 */}
        {!isLoading && nft ? (
          <ThirdwebNftMedia metadata={nft.metadata} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <hr />
      {isMismatched && (
        <button onClick={() => switchNetwork && switchNetwork(ChainId.Mumbai)}>
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

function mintNft(arg0: { name: string; to: string }): void {
  throw new Error("Function not implemented.");
}
