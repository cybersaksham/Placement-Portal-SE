import React, { useContext, useEffect } from 'react'
import Alert from '../Components/Alert'
import Navbar from '../Components/Navbar'
import AuthContext from '../Context/Auth/AuthContext'

const Main = ({ Component, pageProps }) => {
    const { fetchUser } = useContext(AuthContext);

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <>
            <Navbar />
            <Alert />
            <Component {...pageProps} />
        </>
    )
}

export default Main