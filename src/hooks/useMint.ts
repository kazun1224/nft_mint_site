import { useNFTDrop } from "@thirdweb-dev/react";
import { useState } from "react";

import {
  useAddress,
  useMetamask,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";

export const useMint = () => {
  const [isClaiming, setIsClaiming] = useState<boolean>(false);

  const nftDrop = useNFTDrop(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const [, switchNetwork] = useNetwork();
  const isOnWrongNetwork = useNetworkMismatch();

  const mint = async () => {
    if (!address) {
      connectWithMetamask();
      return;
    }

    if (isOnWrongNetwork) {
      switchNetwork && switchNetwork(Number(process.env.NEXT_PUBLIC_CHAIN_ID));

      return;
    }

    setIsClaiming && setIsClaiming(true);

    try {
      const minted = await nftDrop?.claim(1);
      alert(`Successfully minted NFT!`);
    } catch (error) {
      console.error(error);
      alert(error);
    } finally {
      setIsClaiming && setIsClaiming(false);
    }
  };

  return { mint };
};
