import React, { useEffect, useState } from "react";
import axios from "axios";
import conf from '../envConf/conf.js'
import { ProductCard } from "../components/index.js";
import { addToCart } from "../store/cartSlice.js";
function SellerDashBoard() {

    const [data, setData] = useState([])
    async function fetchData(){
        const response = await axios.get(`${conf.backendProductUrl}/getProducts`)
        console.log(response)
        setData(response.data)
        console.log(data)
    }

    useEffect(()=>{
        fetchData();
    },[])

    return <div className="p-4 flex justify-evenly">
        {data?.map((ele)=>{
            return <div key={ele.id}><ProductCard productName={ele.name} productDescription={ele.description} productPrice={ele.price} productImage={`${conf.hostname}${ele.image}`} addToCart="Money will be recived in 10 days" Buy="Order will recive to the buyer in 5 days"/></div>
        })}
    </div>;
}

export default SellerDashBoard;
