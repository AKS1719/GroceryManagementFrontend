import React, { useEffect, useState } from "react";
import axios from "axios";
import conf from '../envConf/conf.js'
import { ProductCard } from "../components/index.js";
import { addToCart } from "../store/cartSlice.js";
import ProductForm from "./ProductForm.jsx";
import service from "../Services/config.js";
import { useSelector } from "react-redux";
function SellerDashBoard() {

    const [product, setProduct] = useState([])
    const email = useSelector((state)=>state.authReducer.userData?.email)
    const [addProduct, setAddProduct] = useState(false)
    let v = "Add Product";
    if(addProduct){
        v = "Don't Add product"
    }
    useEffect(()=>{
        service.getCartItemsByEmail(email).then((res)=>{setProduct(res.documents)})
    },[])


    return <div className="p-4 flex flex-col justify-evenly ">
        <div><button onClick={()=>setAddProduct(!addProduct)}>{v}</button></div>
        <div className="w-full flex flex-col  ">
            {addProduct? (
            <div className="w-80"><ProductForm/></div>):
                product?.map((item) => (
                    <ProductCard
                        key={item.$id}
                        productName={item.productName}
                        productPrice={item.productPrice}
                        productQuantity={item.productQuantity}
                        productImage={item.productImage}
                    />
                ))
            }
        </div>
    </div>;
}

export default SellerDashBoard;
