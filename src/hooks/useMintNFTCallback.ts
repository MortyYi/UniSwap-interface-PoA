import { useTranslation } from "react-i18next"
import { useActiveWeb3React } from "."
import { useTransactionAdder } from "../state/transactions/hooks"
import { useCurrencyBalance } from "../state/wallet/hooks"
import { useMemo } from 'react'
import { useNFTContract } from "./useContract"

export enum WrapType {
    NOT_APPLICABLE,
    WRAP,
    UNWRAP
}

const NOT_APPLICABLE = { wrapType: WrapType.NOT_APPLICABLE }

export default function useMintNFTCallback(
    tokenId: string, mvalue: string
): { wrapType: WrapType; execute?: undefined | (() => Promise<string>); inputError?: string } {
    const { chainId } = useActiveWeb3React()
    const { account } = useActiveWeb3React()

    const NFTContract = useNFTContract()
    const balance = useCurrencyBalance()
    const addTransaction = useTransactionAdder()
    const { t } = useTranslation()
    return useMemo(() => {
        if (!NFTContract || !chainId) return NOT_APPLICABLE

        const sufficientBalance = true

        if (true) {
            return {
                wrapType: WrapType.WRAP,
                execute:
                    sufficientBalance
                        ? async () => {
                            try {
                                const txReceipt = await NFTContract.userMint(account,tokenId, { value: mvalue })
                                addTransaction(txReceipt, { summary: `${t("Mint")} ${t("NFT")}: ${tokenId}  ` })
                                return txReceipt.hash
                            } catch (error) {
                                if (error?.code === 4001) {
                                    throw new Error(t('Transaction rejected.'))
                                } else {
                                    throw new Error(`${t("Lock Order")}${tokenId} ${t("failed")}: ${t(error.data.message.split(":")[1])}`)

                                }
                            }
                        }
                        : undefined,
                inputError: sufficientBalance ? undefined : 'Insufficient ETH balance'
            }
        } else {
            return NOT_APPLICABLE
        }
    }, [NFTContract, chainId, balance, addTransaction, mvalue, tokenId])
}