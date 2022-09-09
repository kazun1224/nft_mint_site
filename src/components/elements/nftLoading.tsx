import { Container, Loader } from "@mantine/core";

import { FC } from "react";

export type Loading = {
  isLoading: boolean;
};

export const NftLoading: FC<Loading> = ({ isLoading }) => {
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
