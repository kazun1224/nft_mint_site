import { Button, Image, Text, Container } from "@mantine/core";
import {
  ChainId,
  useNetwork,
  useNetworkMismatch,
  useNFTs,
} from "@thirdweb-dev/react";
import type { CustomNextPage } from "next";
import { useEffect, useRef } from "react";
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

  // mintする
  const { mint } = useMint();

  //walletの接続
  const { address, connectWallet } = useConnectWallet();

  // NFTの状態を取得
  const { claimPrice, claimedSupply, totalSupply } = useItemDetail();

  // ネットワークの検知と変更
  const isMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  useEffect(() => {
    if (isMismatched) {
      switchNetwork && switchNetwork(ChainId.Mumbai);
    }
  }, [address, isMismatched, switchNetwork]);

  console.log(isMismatched);

  // 任意のNFTを取得
  const {
    data: nfts,
    isLoading,
    error,
  } = useNFTs(nftDrop, { start: 0, count: 100 });
  // console.log(isLoading);

  return (
    <div>
      <Container size={300} px={0} className="mt-10 text-center">
        {nfts ? (
          <Carousel
            slideSize="100%"
            height={300}
            slideGap="md"
            controlsOffset="md"
            loop
            withControls={false}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
          >
            {nfts.map((token, index) => {
              return (
                <Carousel.Slide key={index}>
                  <Image
                    src={
                      token.metadata.image ? token.metadata.image : undefined
                    }
                    alt="NFT"
                    withPlaceholder
                  />
                </Carousel.Slide>
              );
            })}
          </Carousel>
        ) : undefined}
      </Container>

      <Container className="mt-10 text-center">
        {address ? (
          <Button onClick={mint} disabled={isMismatched}>
            {isMismatched ? "claiming..." : `MINT (${claimPrice} MATIC)`}
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
      <Container className="mt-5 text-center">
        {isMismatched && (
          <Button
            onClick={() => switchNetwork && switchNetwork(ChainId.Mumbai)}
          >
            Switch Network
          </Button>
        )}
      </Container>

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
