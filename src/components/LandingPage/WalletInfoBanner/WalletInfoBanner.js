import { lovelaceToAda } from '../../../utility/lovelaceToAda'
import { getWalletSelected } from '../../../utility/walletHelpers'
import styles from './WalletInfoBanner.module.scss'

export const WalletInfoBanner = ({ balance, network }) => {

    const walletSelected = getWalletSelected()

    return (
        <div className={styles.outerWrapper}>
            <div className={styles.innerWrapper}>
                <div className={styles.connectedWalletWrapper}>
                    <div className={`${styles.walletIcon} ${styles[walletSelected]}`} />
                    <h4>{walletSelected}</h4>
                    <span>({network})</span>
                </div>
                <div className={styles.balanceWrapper}>
                    <h1>{(lovelaceToAda(Number(balance))).toFixed(2)} ₳</h1>
                </div>
            </div>
        </div>
    )
}