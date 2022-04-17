import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context";
import AdminRoute from "../../../components/routes/AdminRoute";
import { useRouter, userRouter } from "next/router";
import axios from "axios";
import styles from '../../../styles/Home.module.css';
import {toast} from 'react-toastify';
import Link from 'next/link'
import Head from 'next/head';
import { CameraOutlined, LoadingOutlined } from '@ant-design/icons';
import { Avatar } from "antd";
import DinoForm from "../../../components/DinoForm";

const AdminProduct = () => {
    const [state, setState] = useContext(UserContext);
    const [product, setProduct] = useState({});
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [uploading, setUploading] = useState(false)
   
    const router = useRouter();
    const _id = router.query._id;
 
    useEffect(() => {
        if(_id) fetchProduct();
    }, [_id]);
    

    const fetchProduct = async () => {
        try{
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API}/product/${_id}`);
            setProduct(data);
            setName(data.name)
            setDescription(data.description)
            setPrice(data.price)
            setImage(data.image);
        } catch (err) {
            console.log(err)
        }
    }

    const productSubmit = async (e) => {
        e.preventDefault();
        try{
            const {data} = await axios.put(`${process.env.NEXT_PUBLIC_API}/update-product/${_id}`, {name, description, price, image});
            if(data.error){
                toast.error(error)
            } else {
                toast.success('Product Updated')
                router.push('/admin/products')
            }
        } catch(err){
            console.log(err)
        }
    };

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
            <Head>
            <title>LJ Gram | Edit {product.name} </title>
            <meta name="description" content="Social Media Styled website created by Lewis Jelfs" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
           
            <main>
                <h1 className={styles.title}>
                    Edit Product
                </h1>
               <DinoForm 
               name={name}
               setName={setName}
               description={description}
               setDescription={setDescription}
               price={price}
               setPrice={setPrice}
               uploading={uploading}
               image={image}
               handleImage={handleImage}
               productSubmit={productSubmit}
               />

            </main>
        </AdminRoute>
        </>
    );
}
 
export default AdminProduct;