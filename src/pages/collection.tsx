import { useAddress, useNFTDrop } from "@thirdweb-dev/react";
import type { CustomNextPage } from "next";
import { useEffect, useState } from "react";
import { NftListItem } from "src/components/elements/nftListItem";
import { Layout } from "src/layouts";

const Collection: CustomNextPage = () => {
  const nftDrop = useNFTDrop(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const [allTokens, setAllTokens] = useState<Array<any>>([]);
  const address = useAddress();

  useEffect(() => {
    nftDrop?.getAll().then((results) => {
      setAllTokens(results);
    });
  }, [nftDrop]);
  console.log(address, allTokens);

  return (
    <div>
      <h1>NFT一覧</h1>
      <ul>
        {allTokens.map((token, index) => {
          return (
            <li key={index}>
              <NftListItem token={token} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Collection.getLayout = (page) => <Layout>{page}</Layout>;

export default Collection;
