import styles from './WalletSelection.module.scss'
import { useDappConnector } from '../../../hooks/useDappConnector';
import { lovelaceToAda } from '../../../utility/lovelaceToAda';

export const WalletSelection = () => {
    const {
        onWalletSelect,
        onWalletDisconnect,
        walletSelected,
        isLoading,
        walletValues
    } = useDappConnector()

    return (
        <div className={styles.wrapper}>
            <div>
                <h2 onClick={() => onWalletSelect('nami')}>{isLoading ? 'Loading...' : walletSelected ? 'Wallet Connected' : 'Select Nami Wallet'}</h2>
                {!isLoading && walletSelected &&
                    <>
                        <h2 onClick={() => onWalletDisconnect()}>Disconnect Wallet</h2>
                        <p>Address: {walletValues.address}</p>
                        <p>Balance: {(lovelaceToAda(Number(walletValues.balance))).toFixed(2)} ₳</p>
                        <p>Network: {walletValues.network}</p>
                    </>
                }
            </div>
        </div>
    )
}