import '../styles/globals.css'
import AlertState from '../Context/Alert/AlertState'
import AuthState from '../Context/Auth/AuthState'
import Alert from '../Components/Alert'

function MyApp({ Component, pageProps }) {
  return (
    <AlertState>
      <AuthState>
        <Alert />
        <Component {...pageProps} />
      </AuthState>
    </AlertState>
  )
}

export default MyApp
