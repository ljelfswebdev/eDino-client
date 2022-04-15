import '../styles/globals.css'
import Layout from '../components/layout/layout';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { UserProvider } from "../context";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout><ToastContainer position="top-center"/><Component {...pageProps} /></Layout>
    </UserProvider> 
  )
  
}

export default MyApp