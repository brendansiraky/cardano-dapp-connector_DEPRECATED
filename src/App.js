import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { Landing } from './pages/Landing'

function App() {
    return (
        <>
            <Landing />
            <ToastContainer
                hideProgressBar={false}
                autoClose={1500}
                position="top-right"
            />
        </>
    )
}

export default App;
