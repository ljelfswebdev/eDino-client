import styles from '../styles/Home.module.css';
import { useState, useContext } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import Link from 'next/link';
import { UserContext } from "../context";
import { useRouter } from "next/router";
import Head from 'next/head';



const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const [state] = useContext(UserContext);
    const router= useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
           const {data} = await axios.post(
            `${process.env.NEXT_PUBLIC_API}/register`, {
                name,
                email,
                password,
            }); 
        if (data.error) {
            toast.error(data.error)
        } else {
            toast.success("You have successfully registered")
            setName('');
            setEmail('');
            setPassword('');
            router.push('/products');
          }  
        }
        catch (err) {
          toast.error(err.response.data);
        }  
    };
    
    // if(state && state.token) router.push('/');

    return ( 
        <div className={styles.container}>
            <Head>
            <title>eDino</title>
            <meta name="description" content="ecommerce site to buy dinosaurs!!" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
    
            <main className={styles.main}>
            <h1 className={styles.title}>
                Please Register
            </h1>
            <div>
                <form onSubmit={handleSubmit} className="w-full max-w-sm mt-10">
                <div className="md:flex md:items-center mb-6">

                    <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                        Full Name
                    </label>
                    </div>
                    <div className="md:w-2/3">
                    <input 
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green" 
                    value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" placeholder="What's your name?"
                    />
                    </div>
                </div>
                
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
                        disabled={!name || !email || !password}
                        className="shadow bg-green hover:bg-lime focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button"
                        >
                        Register
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