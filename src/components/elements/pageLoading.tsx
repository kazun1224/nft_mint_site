import { Loader } from "@mantine/core";
import { FC } from "react";

export const PageLoading: FC = () => {
  return (
    <div className="grid h-full min-h-screen w-full grid-rows-1 place-items-center">
      <Loader color="violet" size="xl" variant="dots" />
    </div>
  );
};
