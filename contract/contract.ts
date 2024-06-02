import { parseEther } from "viem"
import { geAppContract } from "./utils"

export const testCall = async (props: {
  userAddress: string
  amount: string
  // _signerAddress: `0x${string}` | undefined
  _seller: `0x${string}` | undefined
}) => {
  const contract = await geAppContract(props.userAddress)

  try {
    const txn = await contract.createPayment(props._seller, {
      gasLimit: 500000,
      value: parseEther(props.amount),
    })

    await txn.wait()
  } catch (error) {
    console.log("An error occurred", error)
  }
}

// export const externalCall = async (props: {
//   // _signerAddress: `0x${string}` | undefined
//   _seller: `0x${string}` | undefined
// }) => {
//   if (window.ethereum) {
//     let accounts = await window.ethereum.request({
//       method: "eth_requestAccounts",
//     })

//     let userAddress = accounts[0]

//     const provider = new BrowserProvider(window.ethereum)

//     const signer = await provider.getSigner(userAddress)

//     console.log("Reached testCall", "props:", props)

//     //   Txn
//     const tx = {
//       to: props._seller,
//       value: parseEther("1.0"),
//     }

//     // signer.sendTransaction(tx)
//     //   Contract call
//     const contract = new Contract(
//       "0x5976D626609c69f986EC7e375eE1168DE54BdF20",
//       exContractABI,
//       signer
//     )

//     try {
//       const txn = await contract.addContributorToDirectory(
//         "a username",
//         userAddress
//       )

//       await txn.wait()
//     } catch (error) {
//       console.log("An error occurred", error)
//     }
//   }
// }
