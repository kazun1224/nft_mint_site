import {
  useClaimedNFTSupply,
  useNFTDrop,
  useUnclaimedNFTSupply,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

import { useEffect, useState } from "react";

export const useItemDetail = () => {
  const nftDrop = useNFTDrop(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
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

  return { claimPrice, claimedSupply, totalSupply };
};
