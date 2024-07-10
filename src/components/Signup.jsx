import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../Services/authService.js";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice.js";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";
import axios from "axios";
import conf from "../envConf/conf.js";

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const createUser = async (data) => {
        setError("");
        console.log(data)
        try {
            const userData = await axios.post(`${conf.backendUserUrl}/register`,{firstName:data.firstName, lastName:data.lastName, email:data.email, password:data.password,Number:data.
                Number},{withCredentials:true});
            if (userData) {
                console.log(userData)
                if (userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (err) {
            console.log(err)
            setError(err.message);
        }
    };
    return (
        <div className="flex mt-4 items-center justify-center">
            <div
                className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
            >
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign up to create account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && (
                    <p className="text-red-600 mt-8 text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit(createUser)}>
                    <div className="space-y-5">
                        <Input
                            label="First Name"
                            type="text"
                            placeholder="Enter your first name"
                            {...register("firstName", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Last Name"
                            type="text"
                            placeholder="Enter your last name"
                            {...register("lastName", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Number"
                            type="number"
                            placeholder="Enter your Mobile Number"
                            {...register("Number", {
                                required: true,
                            })}
                        />

                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your Email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(
                                            value
                                        ) ||
                                        "Email Address Must be valid email address",
                                },
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />

                        <Button
                            children={"Sign Up"}
                            type="submit"
                            className="w-full"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
