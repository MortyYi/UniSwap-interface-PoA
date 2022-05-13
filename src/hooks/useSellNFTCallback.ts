import { useTranslation } from "react-i18next"
import { useActiveWeb3React } from "."
import { useTransactionAdder } from "../state/transactions/hooks"
import { useCurrencyBalance } from "../state/wallet/hooks"
import { useMemo } from 'react'
import { useMarketContract } from "./useContract"

export enum WrapType {
    NOT_APPLICABLE,
    WRAP,
    UNWRAP
}

const NOT_APPLICABLE = { wrapType: WrapType.NOT_APPLICABLE }

export default function useBuyNFTCallback(
    id: string, price:string
): { wrapType: WrapType; execute?: undefined | (() => Promise<string>); inputError?: string } {
    const { chainId } = useActiveWeb3React()

    const NFTMarketContract = useMarketContract()
    const balance = useCurrencyBalance()
    const addTransaction = useTransactionAdder()
    const { t } = useTranslation()
    console.log("useBuyNFTCallback",id ,price)
    return useMemo(() => {
        if (!NFTMarketContract || !chainId) return NOT_APPLICABLE

        const sufficientBalance = true

        if (true) {
            return {
                wrapType: WrapType.WRAP,
                execute:
                    sufficientBalance
                        ? async () => {
                            try {
                                const txReceipt = await NFTMarketContract.sale(id,price)
                                addTransaction(txReceipt, { summary: `Sale NFT: ${id} ` })
                                return txReceipt.hash
                            } catch (error) {
                                if (error?.code === 4001) {
                                    throw new Error(t('Transaction rejected.'))
                                } else {
                                    throw new Error(`${t("Lock Order")}${id} ${t("failed")}: ${t(error.data.message.split(":")[1])}`)

                                }
                            }
                        }
                        : undefined,
                inputError: sufficientBalance ? undefined : 'Insufficient ETH balance'
            }
        } else {
            return NOT_APPLICABLE
        }
    }, [NFTMarketContract, chainId, balance, addTransaction, id])
}