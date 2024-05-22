"use client"

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react"
import {
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import { Toaster } from "sonner"
import { arbitrum, base, celo, celoAlfajores, mainnet } from "wagmi/chains"

import { TrpcProvider } from "./trpcProvider"
import "@rainbow-me/rainbowkit/styles.css"
import type { AppProps } from "next/app"
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets"
import { SessionProvider } from "next-auth/react"
import { WagmiProvider, createConfig, http } from "wagmi"

// import Layout from "../comps/Layout"
import "../styles/globals.css"

// const wagmiConfig = getDefaultConfig({
//   appName: "Xpensa",
//   projectId: "90987766665",
//   chains: [mainnet],
//   ssr: true, // If your dApp uses server side rendering (SSR)
// })

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string

// get one at https://cloud.walletconnect.com/app

const rainbowConfig = getDefaultConfig({
  appName: "Peerie",
  projectId: projectId,
  // projectId: "a1ca0e06558ccfc78d859bff77e9d666",
  chains: [mainnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
})

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [injectedWallet],
    },
  ],
  {
    appName: "Celo Composer",
    projectId,
  }
)

const config = createConfig({
  connectors,
  chains: [celo, celoAlfajores],
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
  },
})

const queryClient = new QueryClient()

export const SettingsContext = createContext<{
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}>({
  isOpen: false,
  setOpen: function (value: React.SetStateAction<boolean>): void {},
})

export function AppProviders(props: { children: ReactNode }) {
  const [isOpen, setOpen] = useState<boolean>(false)
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <WagmiProvider config={rainbowConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <SessionProvider>
              <TrpcProvider>
                <SettingsContext.Provider value={{ isOpen, setOpen }}>
                  {props.children}
                  <Toaster className={"bg-primary"} />
                </SettingsContext.Provider>
              </TrpcProvider>
            </SessionProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  )
}

//  ;<WagmiProvider config={config}>
//    <QueryClientProvider client={queryClient}>
//      <RainbowKitProvider>
//        <SessionProvider>
//          <Layout>
//            <Component {...pageProps} />
//          </Layout>
//        </SessionProvider>
//      </RainbowKitProvider>
//    </QueryClientProvider>
//  </WagmiProvider>
