import { Grid, Text } from "@mantine/core";
import { useAddress, useNFTDrop } from "@thirdweb-dev/react";
import type { CustomNextPage } from "next";
import { useEffect, useState } from "react";
import { NftListItem } from "src/components/elements/nftListItem";
import { Layout } from "src/layouts";

const Owner: CustomNextPage = () => {
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
        if (token.owner === address) {
          owneds = [...owneds, token];
        }
      });
      setOwnedTokens(owneds);
    }
  }, [address, nftDrop, allTokens]);

  return (
    <div>
      <h1>Owner Collection</h1>
      {ownedTokens.length !== 0 ? (
        <Grid gutter="lg" className="mt-10">
          {ownedTokens.map((token, index) => {
            return (
              <Grid.Col xs={6} md={4} key={index}>
                  <NftListItem token={token} />
              </Grid.Col>
            );
          })}
        </Grid>
      ) : (
        <Text size="md" className="mt-10">No Item</Text>
      )}
    </div>
  );
};

Owner.getLayout = (page) => <Layout>{page}</Layout>;

export default Owner;
