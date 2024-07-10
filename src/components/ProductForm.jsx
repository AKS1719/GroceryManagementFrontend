import React from "react";
import Input from "./Input";
import { useSelector } from "react-redux";
import service from "../Services/config";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
function ProductForm() {

    const navigate = useNavigate()
    const { register, handleSubmit } =
        useForm();
    const email = useSelector((state)=> state.authReducer.userData?.email)

    const submit = async(data)=>{
        console.log(data)
        const file = await service.uploadFile(data.productImage[0]);
        
        // data.productImage = file.$id
        // console.log(data)
        const product = await service.addProduct(data);
        if(product){
            navigate('/sellerdashboard')
        }
    }

    return <div>
        <form onSubmit={handleSubmit(submit)}>
            <Input
                    label="Product Name"
                    placeholder="name"
                    className="mb-4"
                    {...register("productName", { required: true })}
                />
            <Input
                    label="Product Description"
                    placeholder="Description"
                    className="mb-4"
                    {...register("productDescription", { required: true })}
                />
            <Input
                    label="Product Price"
                    placeholder="Price"
                    className="mb-4"
                    {...register("productPrice", { required: true })}
                />
            <Input
                        label="Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("productImage", { required: true})}
                    />
            <button type="submit">Submit</button>
        </form>
    </div>;
}

export default ProductForm;
