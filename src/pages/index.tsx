import {
  ActionIcon,
  AspectRatio,
  Button,
  useMantineColorScheme,
} from "@mantine/core";
import { useNFTDrop } from "@thirdweb-dev/react";
import type { CustomNextPage, NextPage } from "next";
import { useEffect } from "react";
import { Layout } from "src/layouts";
import { Moon, Sun } from "tabler-icons-react";

const Home: CustomNextPage = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  // const nftDrop = useNFTDrop(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  useEffect(() => {
    // const result = await contract.burnToken(tokenId);
    // console.log(nftDrop);
  }, []);

  const handleClick = () => {
    console.log("Hello!");
  };

  return (
    <div className="p-20 ">
      <ActionIcon
        variant="outline"
        color={dark ? "blue" : "yellow"}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {dark ? <Moon size={18} /> : <Sun size={18} />}
      </ActionIcon>
      <Button onClick={handleClick}>Lime green</Button>
      <button className="bg-black p-2 text-white">ぼたん</button>
      <AspectRatio ratio={16 / 9}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.3063874233135!2d-74.04668908358428!3d40.68924937933441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25090129c363d%3A0x40c6a5770d25022b!2sStatue%20of%20Liberty%20National%20Monument!5e0!3m2!1sen!2sru!4v1644262070010!5m2!1sen!2sru"
          title="Google map"
          frameBorder="0"
        />
      </AspectRatio>
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
