import { useDappConnector } from '../../../hooks/useDappConnector'
import { WalletInfoBanner } from '../WalletInfoBanner/WalletInfoBanner'
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

    const walletIsConnected = !isLoading && walletSelected

    function handleWalletClick(wallet) {
        if (walletSelected === wallet) {
            onWalletDisconnect()
        } else {
            onWalletSelect(wallet)
        }
    }

    return (
        <>
            <div className={styles.walletsWrapper}>
                <WalletInfoBanner walletIsConnected={walletIsConnected} {...walletValues} />
                <div className="container">
                    <div className="row middle">
                        {WALLETS.map(wallet => (
                            <div className="col-lg-3 col-md-6 col-xs-12">
                                <Wallet 
                                    key={wallet} 
                                    wallet={wallet}
                                    onClick={() => handleWalletClick(wallet)}
                                    isLoading={isLoading && walletSelected === wallet}
                                    isConnected={!isLoading && walletSelected === wallet}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
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