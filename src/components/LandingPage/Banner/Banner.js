import styles from './Banner.module.scss'

export const Banner = () => {
    return (
        <div className={styles.outerWrapper}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className={styles.innerWrapper}>
                            <div className={styles.logo} />
                            <div className={styles.linkedIcon} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}