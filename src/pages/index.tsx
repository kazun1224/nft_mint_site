import {
  Button,
  Image,
  Text,
  Container,
  LoadingOverlay,
  Loader,
} from "@mantine/core";
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
  const { mint, isClaiming } = useMint();

  //walletの接続
  const { address, connectWallet } = useConnectWallet();

  // NFTの状態を取得
  const { claimPrice, claimedSupply, totalSupply } = useItemDetail();

  // ネットワークの検知と変更
  const isMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  useEffect(() => {
    if (isMismatched) {
      switchNetwork && switchNetwork(ChainId.Polygon);
    }
  }, [address, isMismatched, switchNetwork]);

  // 任意のNFTを取得
  const { data: nfts, isLoading } = useNFTs(nftDrop, { start: 0, count: 100 });

  return (
    <div>
      <Container size={300} px={0} className="mt-10 text-center">
        {isLoading ? (
          <Container
            size={300}
            px={0}
            className="mt-10 grid h-300 place-items-center text-center"
          >
            <Loader color="violet" variant="dots" />
          </Container>
        ) : null}
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
        {/* Mintボタンを押してメタマスクの操作が終わるまでオーバーレイを表示 */}
        <LoadingOverlay
          visible={isClaiming}
          overlayBlur={2}
          loader={<Loader color="violet" variant="dots" />}
        />
        {address ? (
          <Button onClick={mint} disabled={isMismatched} color="violet">
            {isMismatched ? "claiming..." : `MINT (${claimPrice} MATIC)`}
          </Button>
        ) : (
          <Button onClick={connectWallet} variant="filled" color="violet">
            <Text size="md">Connect Wallet</Text>
          </Button>
        )}
      </Container>

      {/* チェーン切り替えボタン */}
      {isMismatched && (
        <Container className="mt-5 text-center">
          <Button
            onClick={() => switchNetwork && switchNetwork(ChainId.Polygon)}
            color="violet"
          >
            Switch Network
          </Button>
        </Container>
      )}

      <Text size="md" align="center" className="mt-5">
        {claimedSupply} / {totalSupply}
      </Text>
      <Text size="md" align="center" color="red">
        Polygon Main Net
      </Text>
    </div>
  );
};

Mint.getLayout = (page) => <Layout>{page}</Layout>;

export default Mint;
