import React, { useEffect, useId, useState } from "react";
import { Trash, Heart } from "lucide-react";
import { useSelector } from "react-redux";
import service from "../Services/config";

export default function Cart() {
    const id = useId()
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const email = useSelector((state)=>state.authReducer.userData?.email)
    useEffect(()=>{
        service.getCartItemsByEmail(email).then((items)=>{setProducts(items.documents);})
    },[])

    return (<>

        <form className="w-full flex justify-center align-center mt-12 flex-col p-12">
            <h3>Fill your adress here</h3>
            <textarea></textarea>
        </form>

        <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
            <h2 className="text-3xl font-bold">Your cart</h2>
            <p className="mt-3 text-sm font-medium text-gray-700">
                
            </p>
            <ul className="flex flex-col divide-y divide-gray-200">
                {products.map((product) => (
                    <li
                        key={product.$id}
                        className="flex flex-col py-6 sm:flex-row sm:justify-between"
                    >
                        <div className="flex w-full space-x-2 sm:space-x-4">
                            <img
                                className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                                src={product.productImage}
                                alt={product.productName}
                            />
                            <div className="flex w-full flex-col justify-between pb-4">
                                <div className="flex w-full justify-between space-x-2 pb-2">
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                                            {product.productDescription}
                                        </h3>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-semibold">
                                            {product.productPrice}
                                            
                                        </p>
                                    </div>
                                </div>
                                <div className="flex divide-x text-sm">
                                    <button
                                        type="button"
                                        className="flex items-center space-x-2 px-2 py-1 pl-0"
                                    >
                                        <Trash size={16} />
                                        <span>Remove</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="flex items-center space-x-2 px-2 py-1"
                                    >
                                        <Heart size={16} />
                                        <span>Add to favorites</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="space-y-1 text-right">
                <p>
                    Total amount:
                    <span className="font-semibold"> {totalPrice}</span>
                </p>
            </div>
            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                    Back to shop
                </button>
                <button
                    type="button"
                    className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                    Checkout
                </button>
            </div>
        </div>
        </>
    );
}
