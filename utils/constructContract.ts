import { Collections } from '../state/noun'
import { Contract, ethers } from 'ethers'
import { Provider } from '@ethersproject/providers'

import NounsAbi from '../utils/abi/NounsToken.json'
import LilNounsAbi from '../utils/abi/LilNounsToken.json'

export const constructContract = (
  collection: Collections,
  provider: Provider
): Contract => {
  let contractAddress
  let abi

  switch (collection) {
    case Collections.lilNouns:
      contractAddress = '0x4b10701Bfd7BFEdc47d50562b76b436fbB5BdB3B'
      abi = LilNounsAbi
      break
    case Collections.nouns:
      contractAddress = '0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03'
      abi = NounsAbi
      break
    default:
      contractAddress = ''
      abi = [{}]
  }

  return new ethers.Contract(contractAddress, abi, provider)
}
