import Topbar from './Topbar'
import Header from './Header'
import { Outlet } from 'react-router'
import Footer from './Footer'

const ClientLayout = () => {
  return (
    <div>
      <Topbar />
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default ClientLayout
