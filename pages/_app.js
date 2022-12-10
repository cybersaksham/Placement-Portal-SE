import '../styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Main from '../Components/Main';
import AlertState from '../Context/Alert/AlertState'
import AuthState from '../Context/Auth/AuthState'
import AdminState from "../Context/Admin/AdminState"
import ApplicationState from "../Context/Application/ApplicationState"
import HiringState from "../Context/Hiring/HiringState"
import PostingState from "../Context/Posting/PostingState"
import StatsState from "../Context/Stats/StatsState"

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
          <ApplicationState>
            <HiringState>
              <PostingState>
                <StatsState>
                  <Main Component={Component} pageProps={pageProps} />
                </StatsState>
              </PostingState>
            </HiringState>
          </ApplicationState>
        </AdminState>
      </AuthState>
    </AlertState>
  )
}

export default MyApp
