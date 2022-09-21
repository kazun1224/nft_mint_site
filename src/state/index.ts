import { atom } from "recoil";

export const nftLoadingState = atom<boolean>({
  key: "nftLoadingState",
  default: true,
});
