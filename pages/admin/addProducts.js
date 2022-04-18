import styles from '../../styles/Home.module.css';
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import AdminRoute from "../../components/routes/AdminRoute";
import { useRouter, userRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import Head from 'next/head'
import { CameraOutlined, LoadingOutlined } from '@ant-design/icons';
import { Avatar } from "antd";



const Add = () => {
    const [state, setState] = useContext(UserContext);
    const [uploading, setUploading] = useState(false);
    const router= useRouter();

    const [name, setName] = useState('');
    const [image, setImage] = useState ({});
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/create-product`, { name, description, price, image});
        console.log("create post response => ", data);
        if (data.error) {
            toast.error(data.error);
        } else {
            toast.success("Post Submitted");
            setName("");
            setImage({});
            setDescription('');
            setPrice('');
            router.push('/admin/products')
        }
        } catch (err) {
        console.log(err);
        }
    }

    const handleImage = async (e) => {
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try {
          const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API}/upload-image`, formData );
          setImage({
            url: data.url,
            public_id: data.public_id,
          })
          setUploading(false);
        } catch(err){
          console.log(err);
          setUploading(false);
        }
    }; 



    return ( 
        <>
        <AdminRoute>
        <div className={styles.container}>
            <Head>
            <title>eDino | Add Products</title>
            <meta name="description" content="ecommerce site to buy dinosaurs!!" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
    
            <main>
                <h1 className={styles.title}>
                    Add Products
                </h1>
                <div className="flex justify-center mt-8 mb-8">
                    <div className="rounded-lg shadow-xl bg-gray-50 lg:w-3/4">
                        <div>
                            <form className="w-full mt-10">
                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3 mx-2">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-email">
                                            Name
                                        </label>
                                    </div>
                                    <div className="md:w-2/3 mx-2">
                                        <input 
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green"
                                            value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" placeholder="Name" 
                                        />
                                    </div>
                                </div>

                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3 mx-2">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-description">
                                            Decription
                                        </label>
                                    </div>
                                    <div className="md:w-2/3 mx-2">
                                        <input 
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green"
                                            value={description} onChange={(e) => setDescription(e.target.value)} type="text" id="description" placeholder="Description"
                                        />
                                    </div>
                                </div>

                                <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3 mx-2">
                                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-price">
                                            Price: £
                                        </label>
                                    </div>
                                    <div className="md:w-2/3 mx-2">
                                        <input  
                                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green"
                                            value={price} onChange={(e) => setPrice(e.target.value)} type="number" id="price" placeholder="Price"
                                        />
                                    </div>
                                </div>

                                <div className="m-4">
                                    <label className="inline-block mb-2 text-gray-500">Upload
                                        Image(jpg,png,svg,jpeg)
                                    </label>
                                    {
                                        image && image.url ? (<Avatar size={10} src={image.url}/>) : uploading ? (<LoadingOutlined/>) : (
                                    <div className="flex items-center justify-center w-full">
                                        
                                        <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                            <div className="flex flex-col items-center justify-center pt-7">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                                </svg>
                                              <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                    Select a photo
                                              </p>
                                    
                                        
                                                
                                            </div>
                                    
                                            <input onChange={handleImage} type="file" accept="images/*" hidden className="opacity-0" />
                                        </label>
                                    </div>
                                        )}
                                </div>

                                <div className="flex p-2 space-x-4 justify-center">
                                    <button 
                                    onClick={handleSubmit}
                                    disable ={!name || !description || !price || !image}
                                    className="px-4 py-2 text-white bg-green rounded shadow-xl hover:bg-lime">Create</button>
                                </div>
                            </form>
                        </div>        
                    </div>
                </div>
            </main>
        </div>
    </AdminRoute>
        </>

     );
}
 
export default Add;