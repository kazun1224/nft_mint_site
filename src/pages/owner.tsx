import { Grid, Text } from "@mantine/core";
import type { CustomNextPage } from "next";
import { NftListItem } from "src/components/elements/nftListItem";
import { useGetToken } from "src/hooks/useGetTokens";
import { Layout } from "src/layouts";

const Owner: CustomNextPage = () => {
  const { ownedTokens } = useGetToken();

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
        <Text size="md" className="mt-10">
          No Item
        </Text>
      )}
    </div>
  );
};

Owner.getLayout = (page) => <Layout>{page}</Layout>;

export default Owner;
