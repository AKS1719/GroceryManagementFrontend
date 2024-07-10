import React, { useEffect, useState } from "react";
import axios from "axios";
import conf from '../envConf/conf.js'
import service from "../Services/config.js";
import { ProductCard } from "../components/index.js";

function Home() {

    const [data, setData] = useState([])
    useEffect(()=>{
        service.getAllProducts().then((res)=> {setData(res.documents)})
    },[])

    return <div className="p-4 flex justify-evenly">
        {data?.map((ele)=>{
            return <div key={ele.id}><ProductCard productName={ele.productName} productDescription={ele.productDescription} productPrice={ele.productPrice} productImage={ele.productImage}/></div>
        })}
    </div>;
}

export default Home;
