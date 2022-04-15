import styles from '../styles/Home.module.css';
import { useState, useContext, useEffect } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import Link from 'next/link';
import { UserContext } from "../context";
import { useRouter } from "next/router";
import Head from 'next/head';



const Products = () => {
    const [products, setProducts] = useState([]);

    const router= useRouter();

    const fetchProducts = async () => {
        try{
          const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API}/fetch-products`);
          setProducts(data)
          console.log(data)
        } catch (err){
          console.log(err)
        }
    };
    useEffect(() => {
        fetchProducts(setProducts)
      },[]);


    return ( 
        <div className={styles.container}>
            <Head>
            <title>eDino | Products</title>
            <meta name="description" content="ecommerce site to buy dinosaurs!!" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
    
            <main>
            <h1 className={styles.title}>
                Product List
            </h1>
            <div className='justify-center mb-3 mt-3'>
                {products.map((p) => (
                    <div key={p._id} className="max-w-md rounded overflow-hidden shadow-lg mb-3 hover:bg-green text-center">
                        <img className="w-full" src={p.image.url} alt={p.name}/>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{p.name}</div>
                                <p className="text-gray-700 text-base">
                                    {p.description}
                                </p>
                                <h1 className="text-gray-700 text-base">
                                    £{p.price}
                                </h1>          
                        </div>
                                  {/* <Link href={`/product/${dino.name}`} >
                                    <button className="bg-green2 hover:bg-white hover:text-green2 text-white font-bold py-2 px-4 mb-2 rounded-full">
                                      More Info
                                    </button>
                                  </Link> */}
                                  
                    </div>
                ))}
            </div>      
            </main>
        </div>
    );
}
 
export default Products;