import { BrowserProvider, Contract, ethers } from "ethers"
import { parseEther } from "viem"

import { AppContractAbi } from "./abi"
import { exContractABI } from "./exAbi"
import { fnNames } from "./functions"

export const AppContract = {
  address: "0xb281c5a07C832B85b54c57AB2836dD642841aEC3",
  abi: AppContractAbi,
  fnNames,
}

export const testCall = async (props: {
  // _signerAddress: `0x${string}` | undefined
  _seller: `0x${string}` | undefined
}) => {
  if (window.ethereum) {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })

    let userAddress = accounts[0]

    const provider = new BrowserProvider(window.ethereum)

    const signer = await provider.getSigner(userAddress)

    console.log("Reached testCall", "props:", props)

    //   Txn
    const tx = {
      to: props._seller,
      value: parseEther("1.0"),
    }

    // signer.sendTransaction(tx)
    //   Contract call
    const contract = new Contract(AppContract.address, AppContract.abi, signer)

    try {
      const txn = await contract.createPayment(props._seller, {
        // gasLimit: 500000,
        value: parseEther("1.0"),
      })

      await txn.wait()
    } catch (error) {
      console.log("An error occurred", error)
    }
  }
}
export const externalCall = async (props: {
  // _signerAddress: `0x${string}` | undefined
  _seller: `0x${string}` | undefined
}) => {
  if (window.ethereum) {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })

    let userAddress = accounts[0]

    const provider = new BrowserProvider(window.ethereum)

    const signer = await provider.getSigner(userAddress)

    console.log("Reached testCall", "props:", props)

    //   Txn
    const tx = {
      to: props._seller,
      value: parseEther("1.0"),
    }

    // signer.sendTransaction(tx)
    //   Contract call
    const contract = new Contract(
      "0x5976D626609c69f986EC7e375eE1168DE54BdF20",
      exContractABI,
      signer
    )

    try {
      const txn = await contract.addContributorToDirectory(
        "a username",
        userAddress
      )

      await txn.wait()
    } catch (error) {
      console.log("An error occurred", error)
    }
  }
}
