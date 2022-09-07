import { useAddress, useNFTDrop } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

export const useGetToken = () => {
  const [allTokens, setAllTokens] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ownedTokens, setOwnedTokens] = useState<Array<any>>([]);
  const [fetchError, setFetchError] = useState<Error>();

  const nftDrop = useNFTDrop(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const address = useAddress();

  useEffect(() => {
    nftDrop
      ?.getAll()
      .then((results) => {
        setAllTokens(results);
        setIsLoading(false);
      })
      .catch((error) => {
        
        setFetchError(error);
      });
  }, [nftDrop]);

  useEffect(() => {
    let owneds: Array<any> = [];

    owneds = allTokens.filter((token) => token.owner === address);

    setOwnedTokens(owneds);
  }, [address, allTokens]);

  return { allTokens, ownedTokens, isLoading, fetchError };
};
