import { useNFTDrop } from "@thirdweb-dev/react";
import { useState } from "react";

import {
  useAddress,
  useMetamask,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import { showNotification } from "@mantine/notifications";
import { Check, ExclamationMark } from "tabler-icons-react";

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
      showNotification({
        autoClose: 5000,
        title: "ありがとうございます。",
        message: "オーナーになりました。",
        color: "green",
        icon: <Check />,
      });
    } catch (error) {
      console.error(error);
      showNotification({
        autoClose: 5000,
        title: "失敗しました",
        message: "もう一度やり直してください。",
        color: "red",
        icon: <ExclamationMark />,
      });
    } finally {
      setIsClaiming && setIsClaiming(false);
    }
  };

  return { isClaiming, mint };
};
