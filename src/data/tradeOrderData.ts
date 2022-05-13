//import { Token, TokenAmount } from 'uniswap-hayek-sdk'
//import { isBytesLike } from '@ethersproject/bytes'
import { useMemo } from 'react'
import { useActiveWeb3React } from '../hooks'

import { useMarketContract, useNFTContract } from '../hooks/useContract'

import { Result, useSingleContractMultipleData } from '../state/multicall/hooks'



interface CallState {
  readonly valid: boolean
  // the result, or undefined if loading or errored/no data
  readonly result: Result | undefined
  // true if the result has never been fetched
  readonly loading: boolean
  // true if the result is not for the latest block
  readonly syncing: boolean
  // true if the call was made and is synced, but the return data is invalid
  readonly error: boolean
}
export function useMarketOrderData(): CallState[] | undefined {

  const contract = useMarketContract(false)

  const inputs = useMemo(() => [],
    []
  )
  const order = useSingleContractMultipleData(contract, 'getShop', [inputs])
  return useMemo(() => (order ? order : undefined), order)
}

export function useMyNFTData(): CallState[] | undefined {
  
  const { account } = useActiveWeb3React()
  const accountString =  account?account.toString():"0x0000000000000000000000000000000000000000"
  const contract = useNFTContract(false)

  const inputs = useMemo(() => [accountString],
    [accountString]
  )
  const order = useSingleContractMultipleData(contract, 'getAllYourTokens', [inputs])
  return useMemo(() => (order ? order : undefined), order)
}