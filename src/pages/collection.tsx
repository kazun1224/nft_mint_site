import { Grid } from "@mantine/core";
import { useNFTDrop } from "@thirdweb-dev/react";
import type { CustomNextPage } from "next";
import { useEffect, useState } from "react";
import { NftListItem } from "src/components/elements/nftListItem";
import { Layout } from "src/layouts";

const Collection: CustomNextPage = () => {
  const nftDrop = useNFTDrop(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const [allTokens, setAllTokens] = useState<Array<any>>([]);

  useEffect(() => {
    nftDrop?.getAll().then((results) => {
      setAllTokens(results);
    });
  }, [nftDrop]);

  return (
    <div>
      <h1>NFT一覧</h1>

      <Grid gutter="lg" className="mt-10">
        {allTokens.map((token, index) => {
          return (
            <Grid.Col xs={6} md={4}>
              <div key={index}>
                <NftListItem token={token} />
              </div>
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
};

Collection.getLayout = (page) => <Layout>{page}</Layout>;

export default Collection;
