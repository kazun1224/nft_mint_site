import { Text } from "@mantine/core";
import { useAddress, useNFTDrop } from "@thirdweb-dev/react";

import type { CustomNextPage } from "next";
import { useEffect, useState } from "react";
import { NftListItem } from "src/components/elements/nftListItem";
import { Layout } from "src/layouts";

const Product: CustomNextPage = () => {
  const nftDrop = useNFTDrop(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const address = useAddress();
  const [allTokens, setAllTokens] = useState<Array<any>>([]);
  const [ownedTokens, setOwnedTokens] = useState<Array<any>>([]);

  useEffect(() => {
    nftDrop?.getAll().then((results) => {
      setAllTokens(results);
    });

    if (address) {
      let owneds: Array<any> = [];

      allTokens.map((token) => {
        if (token.owner !== address) {
          owneds = [...owneds, token];
        }
      });
      setOwnedTokens(owneds);
    }
  }, [address, nftDrop, allTokens]);

  console.log(address, ownedTokens, allTokens);

  return (
    <div>
      {ownedTokens.length !== 0 ? (
        ownedTokens.map((token, index) => {
          return (
            <li key={index}>
              <NftListItem token={token} />
            </li>
          );
        })
      ) : (
        <Text size="md">No Item</Text>
      )}
    </div>
  );
};

Product.getLayout = (page) => <Layout>{page}</Layout>;

export default Product;
