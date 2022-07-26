
export function setWalletSelected(wallet) {
    localStorage.setItem('walletSelected', wallet)
}

export function removeWalletSelected() {
    localStorage.removeItem('walletSelected')
}

export function getWalletSelected() {
    return localStorage.getItem('walletSelected')
}