declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_CONTRACT_ADDRESS: string;
    readonly NEXT_PUBLIC_CHAIN_ID: string;
  }
}
