import { useAddress, useNFTDrop } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { nftLoadingState } from "src/state";
import { NFTTokenData } from "src/types/nft";

export const useGetToken = () => {
  const [allTokens, setAllTokens] = useState<NFTTokenData[]>([]);
  const [ownedTokens, setOwnedTokens] = useState<NFTTokenData[]>([]);
  const [fetchError, setFetchError] = useState<Error>();
  const setIsLoading = useSetRecoilState(nftLoadingState);

  const nftDrop = useNFTDrop(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const address = useAddress();

  useEffect(() => {
    nftDrop
      ?.getAll()
      .then((results: any) => {
        setAllTokens(results);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setFetchError(error);
      });
  }, [nftDrop]);

  useEffect(() => {
    setOwnedTokens(allTokens.filter((token) => token.owner === address));
  }, [address, allTokens]);

  return { allTokens, ownedTokens, fetchError };
};
