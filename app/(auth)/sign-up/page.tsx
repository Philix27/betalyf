"use client"

import React, { useEffect, useState } from "react"
import { useSocialConnect } from "@/sc"
import { useConnect } from "wagmi"
import { injected } from "wagmi/connectors"

import SignUpForm from "./form"
import { IFormSchema, defaultValues, formSchema } from "./formSchema"
import styles from "./styles.module.css"

export default function SignUpPage() {
  const { connect } = useConnect()
  const [hideConnectBtn, setHideConnectBtn] = useState(false)
  const { account, connected, lookupAddress } = useSocialConnect()

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMiniPay) {
      setHideConnectBtn(true)
      connect({ connector: injected({ target: "metaMask" }) })
    }
    console.log("SC Account:", account)
  }, [connect])
  return <SignUpForm />
}
