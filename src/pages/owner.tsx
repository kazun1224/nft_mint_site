import { Grid, Text } from "@mantine/core";
import type { CustomNextPage } from "next";
import { useRecoilValue } from "recoil";
import { NftListItem } from "src/components/elements/nftListItem";
import { NftLoading } from "src/components/elements/nftLoading";
import { useGetToken } from "src/hooks/useGetTokens";
import { Layout } from "src/layouts";
import { nftLoadingState } from "src/state";

const Owner: CustomNextPage = () => {
  const { ownedTokens } = useGetToken();
  const isLoading = useRecoilValue(nftLoadingState);

  return (
    <div>
      <h1 className="text-lg font-bold md:text-2xl">Owner Collection</h1>
      <NftLoading />
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
      ) : isLoading ? null : (
        <Text size="md" className="mt-10">
          No Item
        </Text>
      )}
    </div>
  );
};

Owner.getLayout = (page) => <Layout>{page}</Layout>;

export default Owner;
