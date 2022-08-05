import { useDappConnector } from '../../../hooks/useDappConnector'
import { WalletInfoBanner } from '../WalletInfoBanner/WalletInfoBanner'
import { Donate } from '../Donate/Donate'
import styles from './Wallets.module.scss'

const WALLETS = ['nami', 'eternl', 'flint', 'gero']

export const Wallets = () => {
    const {
        onWalletSelect,
        onWalletDisconnect,
        walletSelected,
        isLoading,
        walletValues,
        onSendTransaction
    } = useDappConnector()

    function handleWalletClick(wallet) {
        if (walletSelected === wallet) {
            onWalletDisconnect()
        } else {
            onWalletSelect(wallet)
        }
    }

    const walletIsConnected = !isLoading && walletSelected

    return (
        <>
            <div className={styles.walletsWrapper}>
                <WalletInfoBanner walletIsConnected={walletIsConnected} {...walletValues} />
                <div className="container">
                    <div className="row middle">
                        {WALLETS.map(wallet => (
                            <div key={wallet} className="col-lg-3 col-md-6 col-xs-12">
                                <Wallet 
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
            {walletIsConnected && <Donate onDonate={onSendTransaction} />}
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