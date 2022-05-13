import React, { useState } from 'react';
import Loader from '../../components/Loader';
import { useAllMyNFTDataCallBack } from '../../hooks/useApproveCallback';
import { useActiveWeb3React } from '../../hooks';
import { useWalletModalToggle } from '../../state/application/hooks';
import { ButtonLight } from '../../components/Button';
import useSellNFTCallback from '../../hooks/useSellNFTCallback';
import { SwapPoolTabs } from '../../components/NavigationTabs';

export default function MyNFT() {
    const { account } = useActiveWeb3React()
    const toggleWalletModal = useWalletModalToggle()

    var bs58 = require('bs58')

    const uri = function (s: string) {
        var unencodedData = "1220" + s.substring(2)
        var out = bs58.encode(new Buffer(unencodedData, 'hex'))
        out = "https://ipfs.io/ipfs/" + out
        console.log("sss", unencodedData.substring(2), out)
        return out
    }

    let NFTs = useAllMyNFTDataCallBack()

    return (
        <>
            <SwapPoolTabs active={'My'} />
            <div>我的鞋子</div>
            <br /><br /><br /><br />
            {account ?
                <>
                    {NFTs ?
                        <>
                            {NFTs.map((k) => {
                                return (
                                    <div>
                                        <img src={uri(k.toHexString())} alt="loading picture from IPFS"></img>
                                        <br />
                                        NFT编号:
                                        {k.toHexString()}
                                        <br />
                                        属性:{k.toString().substring(50)}
                                        <br />
                                        <SellNFTButton k={k} />
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
                    }
                </>
                :
                <ButtonLight onClick={toggleWalletModal}>连接钱包</ButtonLight>}
        </>
    )

}
function SellNFTButton(props: any) {
    const [price, setPrice] = useState("1");
    const { execute: onWrap } = useSellNFTCallback(props.k, price)
    const buy = function () {
        if (onWrap) {
            onWrap().then((hash: any) => {
                //alert(hash)
            }).catch((error: any) => {
                alert(error)
            })
        }
    }
    function changePrice(event: any) {
        setPrice(event.target.value)
    }
    return <>
        <input onChange={changePrice} value={price} />
        <button onClick={buy}>出售</button>
    </>
}