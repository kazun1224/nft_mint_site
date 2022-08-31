import { Button, Text } from "@mantine/core";
import {
  useAddress,
  useClaimedNFTSupply,
  useNFTDrop,
  useUnclaimedNFTSupply,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

import type { CustomNextPage } from "next";
import { useEffect, useState } from "react";
import { useConnectWallet } from "src/hooks/useConnectWallet";
import { useMint } from "src/hooks/useMint";
import { Layout } from "src/layouts";

const Mint: CustomNextPage = () => {
  const nftDrop = useNFTDrop(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const { mint } = useMint();
  const { connectWallet } = useConnectWallet();
  const address = useAddress();

  // ミントできるか
  const [isClaiming, setIsClaiming] = useState<boolean>(false);

  // 値段
  const [claimPrice, setClaimPrice] = useState<string>("");

  // NFT値段取得
  useEffect(() => {
    nftDrop?.claimConditions.getActive().then((activeClaimCondition) => {
      setClaimPrice(ethers.utils.formatUnits(activeClaimCondition.price._hex));
    });
  }, [nftDrop?.claimConditions]);

  const [totalSupply, setTotalSupply] = useState<number>(0); // totalSupply コレクション全てのNFT数
  const [claimedSupply, setClaimedSupply] = useState<number>(0); // claimedSupply ミントされたNFTの数
  const { data: unclaimedNft } = useUnclaimedNFTSupply(nftDrop); // ミントされてないNFTの数
  const { data: claimedNft } = useClaimedNFTSupply(nftDrop); // ミント済みNFTの数
  useEffect(() => {
    const total =
      claimedNft && unclaimedNft
        ? claimedNft.toNumber() + unclaimedNft.toNumber()
        : 0;
    const claimed = claimedNft?.toNumber() || 0;
    setClaimedSupply(claimed);
    setTotalSupply(total);
  }, [unclaimedNft, claimedNft]);

  return (
    <div>
      {address ? (
        <Button onClick={mint} disabled={isClaiming}>
          {isClaiming ? "claiming..." : `MINT (${claimPrice} MATIC)`}
        </Button>
      ) : (
        <Button
          onClick={connectWallet}
          variant="filled"
          color="green"
          size="xl"
        >
          <Text size="md">Connect Wallet</Text>
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
