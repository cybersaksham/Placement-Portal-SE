import '../styles/globals.css'
import { useRouter } from 'next/router'
import AlertState from '../Context/Alert/AlertState'
import AuthState from '../Context/Auth/AuthState'
import AdminState from "../Context/Admin/AdminState"
import Alert from '../Components/Alert'
import Navbar from '../Components/Navbar'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const unauthenticatedList = ["/auth/login", "/auth/register"];

  useEffect(() => {
    if (unauthenticatedList.indexOf(router.pathname) === -1) {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) router.push("/auth/login");
    }
  }, [router.pathname])

  return (
    <AlertState>
      <AuthState>
        <AdminState>
          <Navbar />
          <Alert />
          <Component {...pageProps} />
        </AdminState>
      </AuthState>
    </AlertState>
  )
}

export default MyApp
