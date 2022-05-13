import { Interface } from '@ethersproject/abi'
import MARKET_ABI from './market.json'

const MARKET_INTERFACE = new Interface(MARKET_ABI)

//const MARKET_ADDRESS = '0xAE762A0aEF6E377a231c71234944210B104BAe6d' //正在使用中的
const MARKET_ADDRESS = '0xB01fD57954F92274B87c0171117073229b1F8db3' //正在使用中的


export { MARKET_ABI, MARKET_ADDRESS }
export default MARKET_INTERFACE
