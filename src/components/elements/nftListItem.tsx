import { Card, Image, Text } from "@mantine/core";
import { FC } from "react";
import { NftListItemProps } from "src/types/nft";



export const NftListItem: FC<NftListItemProps> = ({ token }) => {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={token.metadata.image || undefined}
          alt="NFT"
          withPlaceholder
        />
      </Card.Section>
      <Text weight={500} size="lg" className="mt-5">
        {token.metadata.name}
      </Text>
    </Card>
  );
};
