import React, { useState } from "react"

export function useLoader() {
  const [loaderState, setShow] = useState<boolean>(false)

  const showLoader = () => setShow(true)
  const hideLoader = () => setShow(true)
  const toggleLoader = () => setShow((prev) => !prev)

  return { showLoader, toggleLoader, hideLoader, loaderState }
}
