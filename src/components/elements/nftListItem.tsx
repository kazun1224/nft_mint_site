import { Image, Text } from "@mantine/core";
import { FC } from "react";

export type NftListItemProps = {
  token: any;
};
export const NftListItem: FC<NftListItemProps> = ({ token }) => {
  return (
    <header>
      <div className="mx-auto w-full max-w-screen-lg px-5 md:px-20">
        <Image
          width={200}
          height={200}
          src={token.metadata.image}
          alt="NFT"
          withPlaceholder
        />
        <div>
          <Text size="md">{token.metadata.name}</Text>
        </div>
      </div>
    </header>
  );
};
