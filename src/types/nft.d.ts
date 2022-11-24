export type NftListItemProps = {
  token:  {
    metadata:NFTMetaDate;
    owner:string;
    supply: number;
    type: string;
  }
};

type NFTMetaDate = {
  description: string;
  id: string;
  image: string;
  name: string;
  uri: string;
}
