import { ActionIcon, Button, useMantineColorScheme } from "@mantine/core";
import { useNFTDrop } from "@thirdweb-dev/react";
import type { CustomNextPage, NextPage } from "next";
import { useEffect } from "react";
import { Layout } from "src/layouts";
import { Moon, Sun } from "tabler-icons-react";

const Home: CustomNextPage = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const nftDrop = useNFTDrop(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  useEffect(()=> {
    // const result = await contract.burnToken(tokenId);
    console.log(nftDrop);

  },[])


  const handleClick = () => {
    console.log("Hello!");
  };

  return (
    <div className="p-20 ">
      <ActionIcon
        variant="outline"
        color={dark ? "yellow" : "blue"}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </ActionIcon>
      <Button
        onClick={handleClick}
        variant="gradient"
        gradient={{ from: "teal", to: "lime", deg: 105 }}
      >
        Lime green
      </Button>
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
