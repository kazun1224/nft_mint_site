import { Container, Grid, Loader } from "@mantine/core";
import type { CustomNextPage } from "next";
import { NftListItem } from "src/components/elements/nftListItem";
import { NftLoading } from "src/components/elements/nftLoading";
import { useGetToken } from "src/hooks/useGetTokens";
import { Layout } from "src/layouts";

const Collection: CustomNextPage = () => {
  const { allTokens, isLoading } = useGetToken();

  return (
    <div>
      <h1 className="text-lg font-bold md:text-2xl">Collections</h1>
      <NftLoading isLoading={isLoading} />
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
