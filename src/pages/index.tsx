import { Button, Image, Text, Container } from "@mantine/core";
import {
  ChainId,
  ThirdwebNftMedia,
  useNetwork,
  useNetworkMismatch,
  useNFT,
  useNFTCollection,
} from "@thirdweb-dev/react";
import type { CustomNextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { useConnectWallet } from "src/hooks/useConnectWallet";
import { useItemDetail } from "src/hooks/useItemDetail";
import { useMint } from "src/hooks/useMint";
import { Layout } from "src/layouts";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useNFTDrop } from "@thirdweb-dev/react";

const Mint: CustomNextPage = () => {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const nftDrop = useNFTDrop(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const [allTokens, setAllTokens] = useState<Array<any>>([]);
  useEffect(() => {
    nftDrop?.getAll().then((results) => {
      setAllTokens(results);
    });
  }, [nftDrop]);

  // mintする
  const { mint } = useMint();

  //walletの接続
  const { address, connectWallet } = useConnectWallet();

  // NFTの状態を取得
  const { claimPrice, claimedSupply, totalSupply, unclaimedNft } =
    useItemDetail();
  console.log(unclaimedNft);

  // // ミントできるか
  const [isClaiming, setIsClaiming] = useState<boolean>(false);

  // ネットワークの検知と変更
  const isMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  useEffect(() => {
    if (isMismatched) {
      switchNetwork && switchNetwork(ChainId.Mumbai);
    }
  }, [address, isMismatched, switchNetwork]);

  // 任意のNFTを取得
  const contract = useNFTCollection(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const { data: nft, isLoading } = useNFT(contract, 3);

  // Carouselの写真
  // const carouselItem = allTokens.map((token, index) => {
  //   return (
  //     <Carousel.Slide  key={index}>
  //         <Image  src={token.metadata.image} alt="NFT" withPlaceholder />
  //     </Carousel.Slide>
  //   );
  // });
  // console.log(carouselItem);

  return (
    <div>
      {/* {allTokens ? (
        <Carousel
          slideSize="100%"
          height={700}
          slideGap="md"
          controlsOffset="md"
          loop
          withControls={false}
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
        >
          {[...carouselItem]}
        </Carousel>
      ) : null} */}
      {/* 任意のNFTを表示 */}
      <Container size="xs" px="xs">
        {!isLoading && nft ? (
          <ThirdwebNftMedia metadata={nft.metadata} />
        ) : (
          <p>Loading...</p>
        )}
      </Container>

      <Container size="xs" px="xs" className="text-center mt-10">
        {address ? (
          <Button onClick={mint} disabled={isClaiming}>
            {isClaiming ? "claiming..." : `MINT (${claimPrice} MATIC)`}
          </Button>
        ) : (
          <Button
            onClick={connectWallet}
            variant="filled"
            color="violet"
            size="xl"
          >
            <Text size="md">Connect Wallet</Text>
          </Button>
        )}
      </Container>

      {/* チェーン切り替えボタン */}
      {isMismatched && (
        <Button onClick={() => switchNetwork && switchNetwork(ChainId.Mumbai)}>
          Switch Network
        </Button>
      )}

      <Text size="md" align="center">
        {claimedSupply} / {totalSupply}
      </Text>
      <Text size="md" align="center" color="red">
        Mumbai testnet
      </Text>
    </div>
  );
};

Mint.getLayout = (page) => <Layout>{page}</Layout>;

export default Mint;
