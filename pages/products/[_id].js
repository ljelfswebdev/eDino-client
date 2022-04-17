import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import { useRouter, userRouter } from "next/router";
import axios from "axios";
import styles from '../../styles/Home.module.css';
import {toast} from 'react-toastify';
import Link from 'next/link'
import Head from 'next/head';

const Product = () => {
    const [state, setState] = useContext(UserContext);
    const [product, setProduct] = useState({});
    const [image, setImage] = useState({});
    // const [cart, setCart] = useState([]);
   
    const router = useRouter();
    const _id = router.query._id;
 
    useEffect(() => {
        if(_id) fetchProduct();
    }, [_id]);
    

    const fetchProduct = async () => {
        try{
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API}/product/${_id}`);
            setProduct(data);
            setImage(data.image);
        } catch (err) {
            console.log(err)
        }
    }

    const addToCart = async () => {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API}/product/${_id}`);
        // setCart(data)
        localStorage.setItem('cart', JSON.stringify(data))
        console.log(data)
    }

    return ( 
        <UserRoute>
            <Head>
            <title>LJ Gram | {product.name} </title>
            <meta name="description" content="Social Media Styled website created by Lewis Jelfs" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
           
            <main>
            <h1 className={styles.title}>
                {product.name}
            </h1>
            <div className="flex flex-wrap justify-center mb-3 mt-5">
                    <div className="max-w-md rounded overflow-hidden shadow-lg mb-3 hover:bg-green text-center mx-2 ">
                        <img className="w-full h-64" src={image.url} alt={product.name}/>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{product.name}</div>
                                <p className="text-gray-700 text-base">
                                    {product.description}
                                </p>
                                <h1 className="text-gray-700 text-base">
                                    £{product.price}
                                </h1>          
                        </div>
                        <Link href="/products" >
                            <button className="bg-lime hover:bg-white hover:text-lime text-white font-bold py-2 px-4 mb-2 rounded-full">
                                Go back
                            </button>
                        </Link>
                        <Link href="/continue" >
                            <button 
                                onClick={addToCart}
                                className="bg-blue hover:bg-white hover:text-blue text-white font-bold py-2 px-4 mb-2 rounded-full">
                                Add to Cart
                            </button>
                        </Link>
                                  
                    </div>
            </div>      
            </main>
        </UserRoute>
    );
}
 
export default Product;