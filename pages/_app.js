import '../styles/globals.css'
import Layout from '../components/layout/layout';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <ToastContainer position="top-center"/>
      <Component {...pageProps} />
    </Layout>
  )
  
}

export default MyApp