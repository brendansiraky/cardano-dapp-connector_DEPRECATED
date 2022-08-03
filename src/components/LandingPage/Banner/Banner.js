import styles from './Banner.module.scss'

export const Banner = () => {
    return (
        <div className={styles.outerWrapper}>
            <div className={styles.innerWrapper}>
                <div className={styles.logo} />
                <a href="https://github.com/brendansiraky/cardano-dapp-connector" target="_blank" rel="noreferrer">
                    <div className={styles.linkedIcon} />
                </a>
            </div>
        </div>
    )
}