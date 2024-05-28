import { BrowserProvider, Contract, ethers } from "ethers"
import { parseEther } from "viem"

import { contractAbi } from "./abi"

export const contractInfo = {
  address: "0xb281c5a07C832B85b54c57AB2836dD642841aEC3",
  abi: contractAbi,
}

export const testCall = async (props: {
  _signerAddress: `0x${string}` | undefined
  _seller: `0x${string}` | undefined
}) => {
  if (window.ethereum) {
    const provider = new BrowserProvider(window.ethereum)

    const signer = await provider.getSigner(props._signerAddress)

    console.log("Reached testCall", "props:", props)

    //   Txn
    const tx = {
      to: props._seller,
      value: parseEther("1.0"),
    }

    signer.sendTransaction(tx)
    //   Contract call
    const contract = new Contract(
      contractInfo.address,
      contractInfo.abi,
      signer
    )

    // try {
    //   const txn = await contract.createPayment(props._seller)

    //   await txn.wait()
    // } catch (error) {
    //   console.log("An error occurred", error)
    // }
  }
}
