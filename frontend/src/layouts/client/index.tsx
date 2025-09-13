import Topbar from './Topbar'
import Header from './Header'
import { Outlet } from 'react-router'
import Footer from './Footer'
import FooterService from '../../components/FooterService'

const ClientLayout = () => {
  return (
    <div>
      <Topbar />
      <Header />
      <Outlet />
      <FooterService />
      <Footer />
    </div>
  )
}

export default ClientLayout
