import { BrowserProvider, Contract, ethers } from "ethers"
import { TokenAddress, getUserAddress } from "./utils"

// Define the ERC20 token ABI (simplified version)
const erc20Abi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
]

export async function transferCusdTokens(
  userAddress: string,
  to: string,
  amount: number
) {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner(userAddress)

  const tokenContract = new ethers.Contract(
    TokenAddress["CUSD_TESTNET"],
    erc20Abi,
    signer
  )

  const recipient = to
  const tokenAmount = ethers.parseUnits(amount.toString(), 18) // Assuming the token has 18 decimals

  // Transfer the tokens
  const tx = await tokenContract.transfer(recipient, tokenAmount)
  console.log("Transaction hash:", tx.hash)

  // Wait for the transaction to be mined
  const receipt = await tx.wait()
  console.log("Transaction confirmed in block:", receipt.blockNumber)
}
