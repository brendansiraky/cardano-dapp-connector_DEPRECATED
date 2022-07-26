import { useState } from 'react'

export const useTransition = () => {
    const [transition, setTransition] = useState({
        loading: false,
        loaded: false,
        failed: false,
        value: null
    })

    const handleUpdateTransition = (objToUpdate) => {
        setTransition(prev => ({
            ...prev,
            ...objToUpdate
        }))
    }

    return [handleUpdateTransition, transition]
}