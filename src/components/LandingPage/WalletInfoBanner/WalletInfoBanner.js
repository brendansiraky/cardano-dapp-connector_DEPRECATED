import { lovelaceToAda } from '../../../utility/lovelaceToAda'
import { getWalletSelected } from '../../../utility/walletHelpers'
import styles from './WalletInfoBanner.module.scss'

export const WalletInfoBanner = ({ balance, network, walletIsConnected }) => {

    const walletSelected = getWalletSelected()

    return (
        <div className={styles.outerWrapper}>
            <div className={styles.innerWrapper}>
                <div className={styles.connectedWalletWrapper}>
                    {walletIsConnected && <div className={`${styles.walletIcon} ${styles[walletSelected]}`} />}
                    <h4>{walletIsConnected ? walletSelected : 'No Wallet Connected'}</h4>
                    {walletIsConnected && <span>({network})</span>}
                </div>
                <div className={styles.balanceWrapper}>
                    <h1>{walletIsConnected ? (lovelaceToAda(Number(balance))).toFixed(2) : '0.00'} ₳</h1>
                </div>
            </div>
        </div>
    )
}