import { useDappConnector } from '../../../hooks/useDappConnector'
import styles from './Wallets.module.scss'
import { WalletInfoBanner } from '../WalletInfoBanner/WalletInfoBanner';

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
        <>
            <div className={styles.walletsWrapper}>
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

            {walletValues.balance && !isLoading && 
            <WalletInfoBanner {...walletValues} />}
        </>
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