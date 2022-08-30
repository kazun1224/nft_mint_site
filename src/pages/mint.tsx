import { Button, Text, useMantineColorScheme } from "@mantine/core";
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

  // const [isClaiming, setIsClaiming] = useState<boolean>(false);
  // const [totalSupply, setTotalSupply] = useState<number>(0);
  // const [claimedSupply, setClaimedSupply] = useState<number>(0);

  const [claimPrice, setClaimPrice] = useState<string>(""); // 値段

  // 確認
  useEffect(() => {
    nftDrop?.claimConditions.getActive().then((activeClaimCondition) => {
      setClaimPrice(ethers.utils.formatUnits(activeClaimCondition.price._hex));
    });
  }, [nftDrop?.claimConditions]);

  // 確認
  // const { data: unclaimedNft } = useUnclaimedNFTSupply(nftDrop);
  // const { data: claimedNft } = useClaimedNFTSupply(nftDrop);
  // setClaimedSupply(claimedNft?.toNumber() || 0);
  // setTotalSupply(
  //   claimedNft && unclaimedNft
  //     ? claimedNft.toNumber() + unclaimedNft.toNumber()
  //     : 0
  // );

  return (
    <div>
      {address ? (
        // <Button onClick={mint} disabled={isClaiming}>
        //   {isClaiming ? "claiming..." : `MINT (${claimPrice} ETH)`}
        // </Button>
        <Button onClick={mint}>mint</Button>
      ) : (
        <Button onClick={connectWallet}>
          <Text size="md">Connect Wallet</Text>
        </Button>
      )}

      {/* <Text size="md" align="center">
        {claimedSupply} / {totalSupply}
      </Text> */}
      <Text size="md" align="center">
        rinkeby testnet
      </Text>
    </div>
  );
};

Mint.getLayout = (page) => <Layout>{page}</Layout>;

export default Mint;
