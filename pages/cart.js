import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import UserRoute from '../components/routes/UserRoute'
import { UserContext } from '../context'
import axios from 'axios'
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter, userRouter } from "next/router";


const Cart = () => {
  const [state, setState] = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (state && state.token) fetchCart();
  }, [state && state.token]);

  const fetchCart = async () => {
    try {
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API}/fetch-cart`);
      setCart(data)
      console.log(data)
    }catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (cart) => {
    try{
      const answer = window.confirm("Are you sure?");
      if (!answer) return;
      const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API}/remove-product/${cart._id}`);
      toast.error("Product Removed");
      fetchCart();
    } catch (err) {
      console.log(err)
    }
  }

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
          <div className='columns-2'>
            <div className='col-md-8'>
              {cart && cart.map((c) => (
                  <div key={c._id}className="flex flex-wrap justify-center mb-3 mt-5">
                    <div className="max-w-md rounded overflow-hidden shadow-lg mb-1 text-center mx-1 w-full">
                      <div className="px-6 py-4 ">
                        <div className="font-bold text-xl mb-2 ">{c.name}</div>
                        <p className="text-gray-700 text-base mb-2">
                          £{c.price}
                        </p>
                        <button onClick={handleDelete} className="bg-red hover:bg-darkred text-white font-bold py-2 px-4 mb-2 rounded-full">Delete</button>
                      </div>
                    </div>
                  </div>    
              ))}
            </div>
            <div className='col-md-4'>
              <div className="flex flex-wrap justify-center mb-3 mt-5">
                <div className="max-w-md rounded overflow-hidden shadow-lg mb-1 text-center mx-1 w-full">
                  <div className="px-6 py-4 ">
                    <div className="font-bold text-xl mb-2 ">Check Out</div>
                    <p className="text-gray-700 text-base mb-2">
                      Total to pay =
                    </p>
                    <Link href="/finish">
                      <button className="bg-blue hover:bg-lightblue text-white font-bold py-2 px-4 mb-2 rounded-full">Pay Now</button>
                    </Link>
                    
                  </div>
                </div>
              </div>
            </div>
          </div> 
          
        </main>
    </div>
    </UserRoute>
    );
}
 
export default Cart;
