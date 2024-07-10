import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart as addToSlice } from "../../store/cartSlice";

import service from "../../Services/config";
function ProductCard({ productName, productPrice, productImage , productDescription="", addToCart="Add to Cart", Buy="Buy"}) {
    const authStatus = useSelector((state)=> state.authReducer.status )
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const email = useSelector((state)=> state.authReducer.userData?.email)
    async function  handleCart(){
        if(!authStatus){
            navigate('/login')
            return
        }
        alert("Item added successfully")
        const data = {email, productName, productPrice, productDescription, productImage}
        console.log(data)
        service.addToCart({email, productName, productPrice, productDescription, productImage})
        dispatch(addToSlice({email, productName, productPrice, productDescription, productImage}))
    }

    return (
        <div className="w-[300px] rounded-md border">
            <img
                src={service.getFilePreview(productImage)}
                alt={productName}
                className="h-[200px] w-full rounded-t-md object-cover"
            />
            <div className="p-4">
                <h1 className="inline-flex items-center text-lg font-semibold">
                    {productName}  {" "}
                    
                </h1>
                <p className="mt-3 text-sm text-gray-600">
                    {productDescription}
                </p>
                <div className="mt-4">
                    <p className="mt-3 text-sm text-black font-bold">{productPrice}</p>
                </div>
                <button
                onClick={handleCart}
                    type="button"
                    className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                    {Buy}
                </button>
                <button
                    onClick={handleCart}
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
