import { useDappConnector } from '../../../hooks/useDappConnector'
import styles from './Wallets.module.scss'

const WALLETS = ['nami', 'eternl', 'flint', 'gero']

export const Wallets = () => {
    const {
        onWalletSelect,
        onWalletDisconnect,
        walletSelected,
        isLoading,
        walletValues
    } = useDappConnector()

    return (
        <div className={styles.walletsWrapper}>
            {/* <h1>162.48 ₳</h1> */}
            {WALLETS.map(wallet => (
                <Wallet 
                    key={wallet} 
                    wallet={wallet}
                    onClick={() => onWalletSelect(wallet)}
                    isLoading={isLoading && walletSelected === wallet}
                    isConnected={!isLoading && walletSelected === wallet}
                />
            ))}
        </div>
    )
}

const Wallet = ({ wallet, onClick, isLoading, isConnected }) => {
    return (
        <div 
            onClick={onClick} 
            className={`${styles.walletWrapper} ${styles[wallet]} ${isLoading ? styles.loading : isConnected ? styles.connected : null}`}>
        </div>
    )
}