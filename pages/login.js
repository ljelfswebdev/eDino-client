import styles from '../styles/Home.module.css';
import { useState, useContext } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import Link from 'next/link';
import { UserContext } from "../context";
import { useRouter } from "next/router";
import Head from 'next/head';



const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [state, setState] = useContext(UserContext);
    const router= useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setLoading(true);
           const {data} = await axios.post(
            `${process.env.NEXT_PUBLIC_API}/login`, {
                email,
                password,
            }); 
            if(data.error) {
                toast.error(data.error);
                setLoading(false)
            } else {
                setState({
                    user: data.user,
                    token: data.token
                });
                window.localStorage.setItem('auth', JSON.stringify(data));
                router.push("/products");
                }       
        }
        catch (err) {
          toast.error(err.response.data);
          setLoading(false);
        }  
    };
    
    if(state && state.token) router.push('/products');

    return ( 
        <div className={styles.container}>
            <Head>
            <title>eDino</title>
            <meta name="description" content="ecommerce site to buy dinosaurs!!" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
    
            <main className={styles.main}>
            <h1 className={styles.title}>
                Login
            </h1>
            <div>
                <form className="w-full max-w-sm mt-10">
                
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-email">
                        Email
                    </label>
                    </div>
                    <div className="md:w-2/3">
                    <input 
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green"
                        value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" 
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                        Password
                    </label>
                    </div>
                    <div className="md:w-2/3">
                    <input 
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green"
                        value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="Password"
                    />
                    </div>
                </div>

                <div className="md:flex md:items-center">
                    <div className="md:w-1/3" />
                    <div className="md:w-2/3">
                    <button
                        onClick={handleSubmit}
                        disabled={!email || !password}
                        className="shadow bg-green hover:bg-lime focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button"
                        >
                        Login
                    </button>
                    </div>
                </div>
            </form>
            </div>      
            </main>
        </div>
    );
}
 
export default Register;