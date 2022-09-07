import { useAddress, useNFTDrop } from "@thirdweb-dev/react";
import { NFTMetadataOwner } from "@thirdweb-dev/sdk";
import { useEffect, useState } from "react";

export const useGetToken = () => {
  const [allTokens, setAllTokens] = useState<NFTMetadataOwner[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ownedTokens, setOwnedTokens] = useState<NFTMetadataOwner[]>([]);
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
    setOwnedTokens(allTokens.filter((token) => token.owner === address));
  }, [address, allTokens]);

  return { allTokens, ownedTokens, isLoading, fetchError };
};
