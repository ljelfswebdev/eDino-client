import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import UserRoute from '../components/routes/UserRoute'
import Product from './products/[_id]'

const Cart = () => {
  const cart = JSON.parse(window.localStorage.getItem('cart'));
  console.log(cart)

    return ( 
    <UserRoute>
    <div className={styles.container}>
        <Head>
          <title>eDino | Cart</title>
          <meta name="description" content="eCommerce site where you can buy shares in dinosaurs" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className={styles.main}>
          <h1 className={styles.title}>
            Cart
          </h1>   
          <div className='flex flex-wrap mb-10 mt-10 justify-center space-x-7'>
              <div>
                {cart.name}
              </div>
          </div>
        </main>
    </div>
    </UserRoute>
    );
}
 
export default Cart;