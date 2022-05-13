import React from 'react';
import Loader from '../../components/Loader';
import { useActiveWeb3React } from '../../hooks';
import { useWalletModalToggle } from '../../state/application/hooks';
import { ButtonLight } from '../../components/Button';
import useMintNFTCallback from '../../hooks/useMintNFTCallback';
import { ethers } from 'ethers';

export default function Mint() {
    const { account } = useActiveWeb3React()
    const toggleWalletModal = useWalletModalToggle()

    const NFTList = [
        "Qme63zDLb7HNz2ThTreVPGTM3a2dU3P7SVKTDPqMd8gwWE",
        "QmcZtQc2ZPqmDnyVe4gzq25xhKVctrbgWDEWhnfNnusCic",
        "QmSQepqy6jnUEehpfTxG4sjYRDU6p7A1rf1dFdyKTbGjgd",
        "QmQJzqisLYC7Jubj4dmVoUMZKeNScLU8RfY9tRcHNEvkxj",
        "QmWp6Y72BXqMPa8K1pfjBtbpGhNC5Vxm3rhjphB4y7ymA3"]
    const uri = function (s: string) {
        // var unencodedData = "1220" + s.substring(2)
        // var out = bs58.encode(new Buffer(unencodedData, 'hex'))
        const out: string = "https://ipfs.io/ipfs/" + s
        //console.log("sss", unencodedData.substring(2), out)
        return out
    }
    var bs58 = require('bs58')

    const decode = function (s: string) {
        const bytes = bs58.decode(s)
        return "0x" + Buffer.from(bytes).toString('hex').substring(4)
    }
    return (
        <>
            <div>Mint</div>
            <br /><br /><br /><br />
            {account ?
                <>
                    {NFTList ?
                        <>
                            {NFTList.map((k) => {
                                return (
                                    <div>
                                        <img src={uri(k)} alt="loading picture from IPFS"></img>
                                        <br />
                                        NFT编号:
                                        {decode(k)}
                                        <br />
                                        属性:
                                        {ethers.BigNumber.from(decode(k)).toString().substring(50)}
                                        <br />
                                        <SellNFTButton k={decode(k)} />
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

    const { execute: onWrap } = useMintNFTCallback(props.k, "1000000000000000000")
    const mint = function () {
        if (onWrap) {
            onWrap().then(() => {
                //alert(hash)
            }).catch((error: any) => {
                alert(error)
            })
        }
    }

    return <>
        <button onClick={mint}>Mint</button>
    </>

}