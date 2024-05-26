"use client"

import React from "react"
import { TextB } from "@/comps"
import { useMinipay,  } from "@/sc"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"

import SignUpForm from "./form"

export default function SignUpPage() {
  // const { account, connected, lookupAddress } = useSocialConnect()
  const { address } = useAccount()
  const { isConnected, walletAddress } = useMinipay()
  if (!isConnected || !walletAddress) {
    return (
      <div className={"flex flex-col items-center justify-start w-full"}>
        <div className="mt-[20vh] bg-secondary rounded-2xl p-4">
          <TextB v="p3" className="mb-4 text-secondary-foreground">Connect your wallet</TextB>
          <ConnectButton />
        </div>
      </div>
    )
  } else {
    return <SignUpForm walletAddress={walletAddress} />
  }
}
