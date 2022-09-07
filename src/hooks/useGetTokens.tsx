import { useAddress, useNFTDrop } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

export const useGetToken = () => {
  const [allTokens, setAllTokens] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ownedTokens, setOwnedTokens] = useState<Array<any>>([]);


  const nftDrop = useNFTDrop(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const address = useAddress();


  useEffect(() => {
    nftDrop?.getAll().then((results) => {
      setAllTokens(results);
      setIsLoading(false);
    });

    let owneds: Array<any> = [];

    allTokens.map((token) => {
      if (token.owner === address) {
        owneds = [...owneds, token];
      }
    });
    setOwnedTokens(owneds);
  }, [nftDrop,address]);

  return { allTokens, isLoading ,ownedTokens};
};
