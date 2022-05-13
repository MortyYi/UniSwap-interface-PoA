import React from 'react';
import Loader from '../../components/Loader';
import { useGetOrderDataCallBack } from '../../hooks/useApproveCallback';
import { ethers } from "ethers";
import useBuyNFTCallback from '../../hooks/useBuyNFTCallback';
import { useActiveWeb3React } from '../../hooks';
import { useWalletModalToggle } from '../../state/application/hooks';
import { ButtonLight } from '../../components/Button';
import { SwapPoolTabs } from '../../components/NavigationTabs';

export default function Market() {
   const { account } = useActiveWeb3React()
   const toggleWalletModal = useWalletModalToggle()

   let order = useGetOrderDataCallBack()

   var bs58 = require('bs58')

   const uri = function (s: string) {
      var unencodedData = "1220" + s.substring(2)
      var out = bs58.encode(new Buffer(unencodedData, 'hex'))
      out = "https://ipfs.io/ipfs/" + out
      console.log("sss", unencodedData.substring(2), out)
      return out
   }

   function BuyNFTButton(props: any) {

      const { execute: onWrap } = useBuyNFTCallback(props.id, props.price)
      const buy = function () {
         if (onWrap) {
            onWrap().then((hash: any) => {
               alert(hash)
            }).catch((error: any) => {
               alert(error)
            })
         }
      }

      return <button onClick={buy}>购买</button>

   }
   
   return (
      <>
       <SwapPoolTabs active={'Buy'} />
         <div>在售鞋子</div>
         <br /><br /><br /><br />
         {account ? <>
            {order ? <>
               {order.map((k) => {



                  return (
                     <div>
                        <img src={uri(k.tokenId.toHexString())} alt="loading pic from IPFS"></img>
                        <br />
                        NFT编号:
                        {k.tokenId.toHexString()}
                        <br />
                        属性:{k.tokenId.toString().substring(50)}
                        <br />
                        <text>卖家地址:{k.seller}</text>
                        <br />
                        <text>价格:{ethers.utils.formatEther(k.price.toString())} VT</text>
                        <br />
                        <BuyNFTButton id={k.tokenId} price={k.price} />
                        <br /><br /><br /><br />
                     </div>
                  )


               })

               }
            </>
               :
               <div style={{ textAlign: "center" }}>
                  <Loader></Loader>
               </div>
            }</> : 
            <ButtonLight onClick={toggleWalletModal}>连接钱包</ButtonLight>}
      </>
   )

}