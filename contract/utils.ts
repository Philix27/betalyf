export type ITokenType =
  | "CUSD_MAINNET"
  | "CUSD_TESTNET"
  | "CELO_MAINNET"
  | "CELO_TESTNET"

export const TokenAddress: Record<ITokenType, string> = {
  CUSD_MAINNET: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
  CUSD_TESTNET: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
  CELO_MAINNET: "",
  CELO_TESTNET: "",
}

export async function getUserAddress() {
  if (window.ethereum) {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })
    return accounts[0] as string
  }
//   return false
}
