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
      <h1>Collection</h1>

      <Grid gutter="lg" className="mt-10">
        {allTokens.map((token, index) => {
          return (
            <Grid.Col key={index} xs={6} md={4}>
                <NftListItem token={token} />
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
};

Collection.getLayout = (page) => <Layout>{page}</Layout>;

export default Collection;
