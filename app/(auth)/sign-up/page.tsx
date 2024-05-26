"use client"

import React, { useEffect, useState } from "react"
import { useMinipay, useSocialConnect } from "@/sc"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"

import SignUpForm from "./form"

export default function SignUpPage() {
  // const { account, connected, lookupAddress } = useSocialConnect()
  const { address } = useAccount()
  const { isConnected, walletAddress } = useMinipay()
  if (!isConnected || !walletAddress) {
    return (
      <div>
        <ConnectButton />
      </div>
    )
  } else {
    return <SignUpForm walletAddress={walletAddress} />
  }
}
