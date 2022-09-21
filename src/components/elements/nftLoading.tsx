import { Container, Loader } from "@mantine/core";

import { FC } from "react";
import { useRecoilValue } from "recoil";
import { nftLoadingState } from "src/state";

export const NftLoading: FC = () => {
  const isLoading = useRecoilValue(nftLoadingState);

  return (
    <>
      {isLoading ? (
        <Container
          size={300}
          px={0}
          className="mt-10 grid h-300 place-items-center text-center"
        >
          <Loader color="violet" variant="dots" />
        </Container>
      ) : null}
    </>
  );
};
