"use client"

import React from "react"
import { AppLoader, AppModal, Button, TextB, TextH } from "@/comps"
import { AppContract, transferCusdTokens } from "@/contract"
import { AppStores, useLoader } from "@/lib"
import { useMinipay } from "@/sc"
import { IoClose } from "react-icons/io5"
import { toast } from "sonner"

export default function BasketPage() {
  const state = AppStores.useProductStore()
  const { walletAddress } = useMinipay()
  const { loadState, showLoad, hideLoad } = useLoader()

  function sumTotal(): number {
    return state.cart.reduce((accumulator, drug) => {
      return accumulator + drug.price * drug.quantity
    }, 0)
  }

  return (
    <div className="px-4 py-2">
      <TextH>Shopping basket</TextH>
      {loadState}
      <AppModal>
        <AppLoader />
      </AppModal>
      {state.cart.map((val, i) => (
        <div
          key={i}
          className="flex items-center justify-between px-2 my-2 bg-card rounded-md"
        >
          <div className="flex items-center justify-center p-2">
            <div
              onClick={() => state.removeFromCart(val.id)}
              className={"bg-red-400 p-2 h-[30px] w-[30px] rounded-[15px] mr-2"}
            >
              <IoClose className={"text-white"} size={13} />
            </div>

            <div className={"h-full items-center justify-center"}>
              <div
                className={`
               flex items-center justify-center 
              h-[72px] w-[72px] 
              rounded-[36px] bg-primary
            `}
              >
                <img
                  src={val.image}
                  alt="drugs"
                  className="h-[70px] w-[70px] rounded-[35px]"
                />
              </div>
            </div>
            <div className="ml-2">
              <TextH>{val.name}</TextH>
              <div className="flex items-center">
                <TextB className={"font-bold mr-4"}>₦ {val.price}</TextB>
                <TextB> x{val.quantity}</TextB>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between h-full gap-y-[1px]">
            <Button onClick={() => state.incrementQuantity(val.id)}>+</Button>
            <Button onClick={() => state.decrementQuantity(val.id)}>-</Button>
          </div>
        </div>
      ))}
      <div className="flex flex-col items-center justify-center my-4">
        <TextH v="h2">₦ {sumTotal()}</TextH>
        <Button
          className="my-4"
          onClick={() => {
            showLoad()
            // transferCusdTokens({
            //   env: "CUSD_TESTNET",
            //   userAddress: walletAddress!,
            //   to: AppContract.secondWallet,
            //   amount: sumTotal() / 1500,
            // })
            setTimeout(() => {
              state.clearCart()
              hideLoad()
              toast.success("Order placed")
            }, 5000)
          }}
        >
          Place order
        </Button>
      </div>
    </div>
  )
}
