import { useMantineColorScheme } from "@mantine/core";

import type { CustomNextPage } from "next";
import { Layout } from "src/layouts";

const Mint: CustomNextPage = () => {
  // themeのセットアップ

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return <div>mint</div>;
};

Mint.getLayout = (page) => <Layout>{page}</Layout>;

export default Mint;
