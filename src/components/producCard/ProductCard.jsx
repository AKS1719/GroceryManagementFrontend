import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../store/cartSlice";
import axios from "axios";
import conf from "../../envConf/conf";
function ProductCard({ productName, productPrice, productQuantity=0, productImage="" , productDiscription="", addToCart="Add to Cart", Buy="Buy"}) {
    const authStatus = useSelector((state)=> state.authReducer.status )
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <div className="w-[300px] rounded-md border">
            <img
                src={productImage}
                alt={productName}
                className="h-[200px] w-full rounded-t-md object-cover"
            />
            <div className="p-4">
                <h1 className="inline-flex items-center text-lg font-semibold">
                    {productName}  {" "}
                    
                </h1>
                <p className="mt-3 text-sm text-gray-600">
                    {productDiscription}
                </p>
                <div className="mt-4">
                    <p className="mt-3 text-sm text-black font-bold">{productPrice}</p>
                </div>
                <button
                onClick={(e)=>{
                    if(!authStatus){
                        navigate('/login')
                        return
                    }
                    const product = {productName: productName,productDiscription,productPrice,productImage}
                    ;(async () =>{await axios.post(`${conf.backendCartUrl}/addToCart`,{product})})()
                    alert("Item added successfully")
                    
                }}
                    type="button"
                    className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                    {Buy}
                </button>
                <button
                    onClick={(e)=>{
                    if(!authStatus){
                        navigate('/login')
                        return
                    }
                    alert("Item added successfully")}}
                    type="button"
                    className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                    {addToCart}
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
